/**
 * Dynamic Publications Filter with Quality-based Sorting
 * Automatically extracts venues and years from bibliography entries
 * and creates filter dropdowns dynamically with venue quality ranking
 */

document.addEventListener('DOMContentLoaded', function() {
  // Define venue quality rankings
  const venueRankings = {
    // Top tier conferences
    'USENIX NSDI': 1000,
    
    // ACM conferences (in specified order)
    'ACM EuroSys': 900,
    'ACM MobiCom': 890,
    'ACM MobiSys': 880,
    'ACM SenSys': 870,
    'ACM MMSys': 860,
    
    // ACM/IEEE conferences
    'ACM/IEEE SEC': 800,
    'ACM/IEEE IWQoS': 790,
    
    // IEEE conferences (INFOCOM first)
    'IEEE INFOCOM': 700,
    'IEEE ICDCS': 690,
    'IEEE ICCCN': 680,
    'IEEE ICPADS': 670,
    'IEEE MASS': 660,

    
    // ACM journals/transactions
    'ACM UbiComp': 850,
    'ACM IMWUT/UbiComp': 840,
    'ACM/IEEE ToN': 780,
    'ACM/IEEE TOSN': 770,
    'IEEE TMC': 650,
    'IEEE TIM': 640,
    'IEEE IoTJ': 630,
    
    // Default score for unlisted venues
    'default': 500
  };

  // Initialize filter system
  initializeFilters();
  
  function initializeFilters() {
    // Extract all publication data
    const publications = extractPublicationData();
    
    // Generate filter options dynamically
    generateFilterOptions(publications);
    
    // Apply initial quality sorting
    applyFilters();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize publication count
    updatePublicationCount();
  }
  
  function extractPublicationData() {
    const publications = [];
    
    // Get all publication entries from conference and journal sections
    document.querySelectorAll('.conference-publications ol.bibliography li, .journal-publications ol.bibliography li').forEach(entry => {
      const venue = extractVenue(entry);
      const year = extractYear(entry);
      const keywords = extractKeywords(entry);
      const qualityScore = getVenueQuality(venue);
      // Determine type based on which section the entry is in (Jekyll Scholar already separated by mark)
      const isConference = entry.closest('.conference-publications') !== null;
      const mark = isConference ? 'conference' : 'article';
      
      publications.push({
        element: entry,
        venue: venue,
        year: year,
        keywords: keywords,
        qualityScore: qualityScore,
        mark: mark,
        text: entry.textContent.toLowerCase()
      });
    });
    
    return publications;
  }
  
  function extractVenue(entry) {
    // Try to get venue from abbr element first
    const abbrElement = entry.querySelector('.abbr');
    if (abbrElement) {
      return abbrElement.textContent.trim();
    }
    
    // Fallback: try to extract from title or other elements
    const titleElement = entry.querySelector('.title');
    if (titleElement) {
      const text = titleElement.textContent;
      // Look for common conference/journal patterns
      const patterns = [
        /(?:Proceedings of (?:the )?)(ACM|IEEE|USENIX)\s+([A-Z]+[a-zA-Z]*)/i,
        /(ACM|IEEE)\s+([A-Z]+[a-zA-Z]*)/i,
        /([A-Z]+[a-zA-Z]*)\s+(Conference|Journal|Transactions)/i
      ];
      
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
          return match[0];
        }
      }
    }
    
    return 'Unknown';
  }
  
  function extractYear(entry) {
    // Look for year in the entry text
    const yearMatch = entry.textContent.match(/\b(20\d{2})\b/);
    return yearMatch ? yearMatch[1] : 'Unknown';
  }
  
  function extractKeywords(entry) {
    // Extract potential keywords from title and other text
    const titleElement = entry.querySelector('.title');
    if (titleElement) {
      return titleElement.textContent.toLowerCase();
    }
    return '';
  }
  
  function generateFilterOptions(publications) {
    // Extract unique venues and years, along with their section info
    const conferenceVenues = new Set();
    const journalVenues = new Set();
    const years = new Set();
    
    publications.forEach(pub => {
      if (pub.venue && pub.venue !== 'Unknown') {
        if (pub.mark === 'conference') {
          conferenceVenues.add(pub.venue);
        } else {
          journalVenues.add(pub.venue);
        }
      }
      if (pub.year && pub.year !== 'Unknown') {
        years.add(pub.year);
      }
    });
    
    // Sort years in descending order
    const sortedYears = Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
    
    // Populate venue filter with proper categorization
    populateVenueFilterBySections(conferenceVenues, journalVenues);
    
    // Populate year filter
    populateYearFilter(sortedYears);
  }
  
  function getVenueQuality(venue) {
    // Normalize venue name for matching
    const normalizedVenue = venue.trim();
    return venueRankings[normalizedVenue] || venueRankings['default'];
  }
  
  function getDisplayName(venueName) {
    // Custom display names for specific venues
    const displayNames = {
      'ACM UbiComp': 'ACM IMWUT/UbiComp'
    };
    
    return displayNames[venueName] || venueName;
  }
  
  function populateVenueFilterBySections(conferenceVenues, journalVenues) {
    const venueFilter = document.getElementById('venue-filter');
    if (!venueFilter) return;
    
    // Clear existing options except the first one (All Venues)
    while (venueFilter.children.length > 1) {
      venueFilter.removeChild(venueFilter.lastChild);
    }
    
    // Convert to arrays and sort by quality
    const conferences = Array.from(conferenceVenues).map(venue => ({
      name: venue,
      displayName: getDisplayName(venue),
      quality: getVenueQuality(venue)
    })).sort((a, b) => b.quality - a.quality);
    
    const journals = Array.from(journalVenues).map(venue => ({
      name: venue,
      displayName: getDisplayName(venue),
      quality: getVenueQuality(venue)
    })).sort((a, b) => b.quality - a.quality);
    
    // Add conference options
    if (conferences.length > 0) {
      const confGroup = document.createElement('optgroup');
      confGroup.label = 'Conferences';
      conferences.forEach(venueObj => {
        const option = document.createElement('option');
        option.value = venueObj.name;
        option.textContent = venueObj.displayName;
        confGroup.appendChild(option);
      });
      venueFilter.appendChild(confGroup);
    }
    
    // Add journal options
    if (journals.length > 0) {
      const journalGroup = document.createElement('optgroup');
      journalGroup.label = 'Journals';
      journals.forEach(venueObj => {
        const option = document.createElement('option');
        option.value = venueObj.name;
        option.textContent = venueObj.displayName;
        journalGroup.appendChild(option);
      });
      venueFilter.appendChild(journalGroup);
    }
  }
  
  function populateYearFilter(years) {
    const yearFilter = document.getElementById('year-filter');
    if (!yearFilter) return;
    
    // Clear existing options except the first one (All Years)
    while (yearFilter.children.length > 1) {
      yearFilter.removeChild(yearFilter.lastChild);
    }
    
    // Add year options
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearFilter.appendChild(option);
    });
  }
  
  function setupEventListeners() {
    const venueFilter = document.getElementById('venue-filter');
    const yearFilter = document.getElementById('year-filter');
    const keywordFilter = document.getElementById('keyword-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    if (venueFilter) venueFilter.addEventListener('change', applyFilters);
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    if (keywordFilter) keywordFilter.addEventListener('input', applyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  function applyFilters() {
    const venue = document.getElementById('venue-filter')?.value.toLowerCase() || '';
    const year = document.getElementById('year-filter')?.value || '';
    const keyword = document.getElementById('keyword-filter')?.value.toLowerCase() || '';
    const shouldSortByQuality = true; // Always sort by quality
    
    // Get all publications with their data
    const allPublications = [];
    
    document.querySelectorAll('.conference-publications ol.bibliography li, .journal-publications ol.bibliography li').forEach(entry => {
      let show = true;
      
      // Venue filter
      if (venue && entry.querySelector('.abbr') && 
          !entry.querySelector('.abbr').textContent.toLowerCase().includes(venue)) {
        show = false;
      }
      
      // Year filter
      if (year && !entry.textContent.includes(year)) {
        show = false;
      }
      
      // Keyword filter
      if (keyword && !entry.textContent.toLowerCase().includes(keyword)) {
        show = false;
      }
      
      if (show) {
        const venueText = entry.querySelector('.abbr')?.textContent.trim() || 'Unknown';
        const yearText = extractYear(entry);
        allPublications.push({
          element: entry,
          venue: venueText,
          year: parseInt(yearText),
          quality: getVenueQuality(venueText),
          originalParent: entry.parentNode
        });
      } else {
        entry.style.display = 'none';
      }
    });
    
    // Sort publications if quality sorting is enabled
    if (shouldSortByQuality && allPublications.length > 0) {
      // Sort by quality (descending) then by year (descending)
      allPublications.sort((a, b) => {
        if (a.quality !== b.quality) {
          return b.quality - a.quality;
        }
        return b.year - a.year;
      });
      
      // Re-arrange DOM elements
      rearrangePublications(allPublications);
    }
    
    // Show filtered publications
    allPublications.forEach(pub => {
      pub.element.style.display = 'block';
    });
    
    // Hide empty sections
    hideEmptySections();
    
    // Update publication count
    updatePublicationCount();
  }
  
  function clearFilters() {
    const venueFilter = document.getElementById('venue-filter');
    const yearFilter = document.getElementById('year-filter');
    const keywordFilter = document.getElementById('keyword-filter');
    
    if (venueFilter) venueFilter.value = '';
    if (yearFilter) yearFilter.value = '';
    if (keywordFilter) keywordFilter.value = '';
    
    // Show all entries
    document.querySelectorAll('.conference-publications ol.bibliography li, .journal-publications ol.bibliography li').forEach(entry => {
      entry.style.display = 'block';
    });
    
    // Show all sections
    showAllSections();
    
    // Update publication count
    updatePublicationCount();
  }
  
  function hideEmptySections() {
    document.querySelectorAll('.conference-publications, .journal-publications').forEach(section => {
      const visibleEntries = Array.from(section.querySelectorAll('ol.bibliography li')).filter(e => e.style.display !== 'none');
      const sectionHeader = section.closest('div').previousElementSibling;
      
      if (sectionHeader && sectionHeader.tagName.startsWith('H') && visibleEntries.length === 0) {
        sectionHeader.style.display = 'none';
      } else if (sectionHeader && sectionHeader.tagName.startsWith('H')) {
        sectionHeader.style.display = 'block';
      }
    });
    
    // Hide empty year headers
    document.querySelectorAll('h2.bibliography').forEach(yearHeader => {
      const yearEntries = Array.from(yearHeader.nextElementSibling.querySelectorAll('li')).filter(e => e.style.display !== 'none');
      
      if (yearEntries.length === 0) {
        yearHeader.style.display = 'none';
      } else {
        yearHeader.style.display = 'block';
      }
    });
  }
  
  function showAllSections() {
    // Show all section headers
    document.querySelectorAll('.conference-publications, .journal-publications').forEach(section => {
      const sectionHeader = section.closest('div').previousElementSibling;
      if (sectionHeader && sectionHeader.tagName.startsWith('H')) {
        sectionHeader.style.display = 'block';
      }
    });
    
    // Show all year headers
    document.querySelectorAll('h2.bibliography').forEach(yearHeader => {
      yearHeader.style.display = 'block';
    });
  }
  
  function rearrangePublications(sortedPublications) {
    // Group publications by year and section
    const publicationsByYearSection = {};
    
    sortedPublications.forEach(pub => {
      const year = pub.year;
      const isConference = pub.element.closest('.conference-publications');
      const sectionKey = isConference ? 'conference' : 'journal';
      const key = `${year}-${sectionKey}`;
      
      if (!publicationsByYearSection[key]) {
        publicationsByYearSection[key] = [];
      }
      publicationsByYearSection[key].push(pub);
    });
    
    // Sort within each year-section group by quality
    Object.keys(publicationsByYearSection).forEach(key => {
      publicationsByYearSection[key].sort((a, b) => b.quality - a.quality);
    });
    
    // Re-arrange elements within each year group
    Object.keys(publicationsByYearSection).forEach(key => {
      const publications = publicationsByYearSection[key];
      const [year] = key.split('-');
      
      // Find the year header and its corresponding ol element
      const yearHeaders = Array.from(document.querySelectorAll('h2.bibliography')).filter(h => 
        h.textContent.includes(year)
      );
      
      yearHeaders.forEach(yearHeader => {
        const nextElement = yearHeader.nextElementSibling;
        if (nextElement && nextElement.tagName === 'OL') {
          // Get publications in this year's ol that match the section
          const yearPublications = publications.filter(pub => {
            const isInThisYear = Array.from(nextElement.children).includes(pub.element);
            return isInThisYear;
          });
          
          if (yearPublications.length > 0) {
            // Remove and re-add in quality order
            yearPublications.forEach(pub => pub.element.remove());
            yearPublications.forEach(pub => nextElement.appendChild(pub.element));
          }
        }
      });
    });
  }
  
  function updatePublicationCount() {
    const visibleConferencePapers = Array.from(document.querySelectorAll('.conference-publications ol.bibliography li')).filter(e => e.style.display !== 'none').length;
    const visibleJournalPapers = Array.from(document.querySelectorAll('.journal-publications ol.bibliography li')).filter(e => e.style.display !== 'none').length;
    
    const publicationCount = document.getElementById('publication-count');
    if (!publicationCount) return;
    
    let countText = "";
    if (visibleConferencePapers > 0) {
      countText += `Conference: ${visibleConferencePapers}`;
    }
    if (visibleJournalPapers > 0) {
      if (countText) countText += ", ";
      countText += `Journal: ${visibleJournalPapers}`;
    }
    
    if (countText) {
      publicationCount.textContent = countText;
    } else {
      publicationCount.textContent = "No results found";
    }
  }
});