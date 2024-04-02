---
layout: page
permalink: /publications/
title: Publications
description: † indicates corresponding author; * indicates co-primary author; ^ indicates students mentored by me.
nav: true
nav_order: 1
---

<!-- <i class="fas fa-hand-point-right"></i> Check out my [Google Scholar](https://scholar.google.com/citations?user=ZbqGJ_YAAAAJ&hl=en) profile, [CV](../assets/pdf/CV_jingao.pdf), and the [Overview of My Research](../blog/2023/work-overview/) for more details. -->

<!-- _pages/publications.md -->

## <i class="fa-solid fa-file"></i> Conference
<div class="publications">
{% bibliography -f {{ site.scholar.bibliography }} -q @*[mark=conference]* %}
</div>

## <i class="fa-solid fa-file-lines"></i> Journal
<div class="publications">
{% bibliography -f {{ site.scholar.bibliography }} -q @*[mark=article]* %}
</div>