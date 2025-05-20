---
layout: page
permalink: /publications/
title: Publications
description: † indicates corresponding author; * indicates co-primary author; <u>Students</u> mentored by me.
nav: true
nav_order: 1
---

<i class="fas fa-hand-point-right"></i> Check out my [Google Scholar](https://scholar.google.com/citations?user=ZbqGJ_YAAAAJ&hl=en) profile, [CV](../assets/pdf/CV_jingao.pdf), and the [Overview of My Research](../blog/2023/work-overview/) for more details.

<!-- _pages/publications.md -->

## <i class="fa-solid fa-book"></i> Book
<div class="publications book-publications">
{% bibliography -f {{ site.scholar.bibliography }} -q @*[mark=book]* %}
</div>

<!-- Filter Controls -->
<div class="publication-filters">
  <div class="row mt-3">
    <div class="col-sm-4">
      <div class="form-group">
        <label for="venue-filter">Filter by Venue:</label>
        <select class="form-control" id="venue-filter">
          <option value="">All Venues</option>
          <optgroup label="Conferences">
          <option value="USENIX NSDI">USENIX NSDI</option>
          <option value="ACM MobiCom">ACM MobiCom</option>
          <option value="ACM MobiSys">ACM MobiSys</option>
          <option value="ACM SenSys">ACM SenSys</option>
          <option value="ACM MMSys">ACM MMSys</option>
          <option value="ACM/IEEE SEC">ACM/IEEE SEC</option>
          <option value="ACM/IEEE IWQoS">ACM/IEEE IWQoS</option>
          <option value="IEEE INFOCOM">IEEE INFOCOM</option>
          <option value="IEEE ICDCS">IEEE ICDCS</option>
          <option value="IEEE ICCCN">IEEE ICCCN</option>
          <option value="IEEE ICPADS">IEEE ICPADS</option>
          <option value="IEEE MASS">IEEE MASS</option>
          </optgroup>
          <optgroup label="Journals">
          <option value="ACM UbiComp">ACM IMWUT/UbiComp</option>
          <option value="ACM/IEEE ToN">ACM/IEEE ToN</option>
          <option value="ACM/IEEE TOSN">ACM/IEEE TOSN</option>
          <option value="IEEE TMC">IEEE TMC</option>
          <option value="IEEE TIM">IEEE TIM</option>
          <option value="IEEE IoTJ">IEEE IoTJ</option>
          </optgroup>
        </select>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="year-filter">Filter by Year:</label>
        <select class="form-control" id="year-filter">
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
        </select>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="keyword-filter">Search by Keyword:</label>
        <input type="text" class="form-control" id="keyword-filter" placeholder="Edge, Drone, MobiCom, ...">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <button class="btn btn-primary" id="clear-filters">Clear Filters</button>
    </div>
    <div class="col-6 text-right">
      <span id="publication-count" class="count-badge"></span>
    </div>
  </div>
</div>

## <i class="fa-solid fa-file"></i> Conference
<div class="publications conference-publications">
{% bibliography -f {{ site.scholar.bibliography }} -q @*[mark=conference]* %}
</div>

## <i class="fa-solid fa-file-lines"></i> Journal
<div class="publications journal-publications">
{% bibliography -f {{ site.scholar.bibliography }} -q @*[mark=article]* %}
</div>

<!-- Filter JavaScript -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  const venueFilter = document.getElementById('venue-filter');
  const yearFilter = document.getElementById('year-filter');
  const keywordFilter = document.getElementById('keyword-filter');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const publicationCount = document.getElementById('publication-count');
  
  // 初始化显示总数
  updatePublicationCount();
  
  const applyFilters = () => {
    const venue = venueFilter.value.toLowerCase();
    const year = yearFilter.value;
    const keyword = keywordFilter.value.toLowerCase();
    
    // 只选择会议和期刊部分的列表项
    document.querySelectorAll('.conference-publications ol.bibliography li, .journal-publications ol.bibliography li').forEach(entry => {
      let show = true;
      
      // Venue filter - 会议/期刊名称通常在abbr元素中
      if (venue && entry.querySelector('.abbr') && 
          !entry.querySelector('.abbr').textContent.toLowerCase().includes(venue)) {
        show = false;
      }
      
      // Year filter - 年份通常在整个条目文本中
      if (year && !entry.textContent.includes(year)) {
        show = false;
      }
      
      // Keyword filter - 关键词可能在标题、作者或其他任何地方
      if (keyword && !entry.textContent.toLowerCase().includes(keyword)) {
        show = false;
      }
      
      entry.style.display = show ? 'block' : 'none';
    });
    
    // 检查每个部分是否所有条目都被隐藏，如果是则隐藏部分标题
    // 只检查会议和期刊部分
    document.querySelectorAll('.conference-publications, .journal-publications').forEach(section => {
      const visibleEntries = Array.from(section.querySelectorAll('ol.bibliography li')).filter(e => e.style.display !== 'none');
      const sectionHeader = section.closest('div').previousElementSibling;
      
      if (sectionHeader && sectionHeader.tagName.startsWith('H') && visibleEntries.length === 0) {
        sectionHeader.style.display = 'none';
      } else if (sectionHeader && sectionHeader.tagName.startsWith('H')) {
        sectionHeader.style.display = 'block';
      }
    });
    
    // 隐藏空的年份标题
    document.querySelectorAll('h2.bibliography').forEach(yearHeader => {
      // 获取年份标题后的所有论文条目
      const yearEntries = Array.from(yearHeader.nextElementSibling.querySelectorAll('li')).filter(e => e.style.display !== 'none');
      
      if (yearEntries.length === 0) {
        // 如果没有可见的论文条目，隐藏年份标题
        yearHeader.style.display = 'none';
      } else {
        yearHeader.style.display = 'block';
      }
    });
    
    // 更新论文数量显示
    updatePublicationCount();
  };
  
  const clearFilters = () => {
    venueFilter.value = '';
    yearFilter.value = '';
    keywordFilter.value = '';
    
    document.querySelectorAll('.conference-publications ol.bibliography li, .journal-publications ol.bibliography li').forEach(entry => {
      entry.style.display = 'block';
    });
    
    // 确保所有会议和期刊部分的标题都是可见的
    document.querySelectorAll('.conference-publications, .journal-publications').forEach(section => {
      const sectionHeader = section.closest('div').previousElementSibling;
      if (sectionHeader && sectionHeader.tagName.startsWith('H')) {
        sectionHeader.style.display = 'block';
      }
    });
    
    // 显示所有年份标题
    document.querySelectorAll('h2.bibliography').forEach(yearHeader => {
      yearHeader.style.display = 'block';
    });
    
    // 更新论文数量显示
    updatePublicationCount();
  };
  
  // 函数：更新论文数量显示
  function updatePublicationCount() {
    const visibleConferencePapers = Array.from(document.querySelectorAll('.conference-publications ol.bibliography li')).filter(e => e.style.display !== 'none').length;
    const visibleJournalPapers = Array.from(document.querySelectorAll('.journal-publications ol.bibliography li')).filter(e => e.style.display !== 'none').length;
    
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
  
  venueFilter.addEventListener('change', applyFilters);
  yearFilter.addEventListener('change', applyFilters);
  keywordFilter.addEventListener('input', applyFilters);
  clearFiltersBtn.addEventListener('click', clearFilters);
});
</script>

<style>
.publication-filters {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.btn-primary {
  margin-top: 10px;
}
#publication-count {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #e9ecef;
  border-radius: 4px;
  font-weight: 500;
  color: #495057;
  border: 1px solid #ced4da;
}
</style>