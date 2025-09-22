---
layout: page
permalink: /publications/
title: Publications
description: † indicates corresponding author; * indicates co-primary author; <u>Students</u> mentored by me.
nav: true
nav_order: 1
---

<!-- <i class="fas fa-hand-point-right"></i> Check out my [Google Scholar](https://scholar.google.com/citations?user=ZbqGJ_YAAAAJ&hl=en) profile and [CV](../assets/pdf/CV_jingao.pdf) for more details. -->

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
          <!-- Options will be populated dynamically by JavaScript -->
        </select>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="form-group">
        <label for="year-filter">Filter by Year:</label>
        <select class="form-control" id="year-filter">
          <option value="">All Years</option>
          <!-- Options will be populated dynamically by JavaScript -->
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

<!-- Load dynamic filter script -->
<script src="{{ '/assets/js/publications-filter.js' | relative_url }}"></script>

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