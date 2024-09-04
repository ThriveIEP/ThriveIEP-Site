---
title: The Thrive Blog
layout: default
subtitle: IEPs are complex, but they do not need to be.
order: 0
sitemap: false
---

{% include subStyles.css %}

{% assign programs = site.articles %}
{% for article in programs %}
  <div class="row">
 
    <div class="col-4">
      <h4>
        {{ article.title }}
      </h4>
      <!-- <span class="badge bg-success">Status: {{ article.status}}</span>
      <span class="badge bg-success">Stage: {{ article.stage}}</span> -->
    </div>
    <div class="col-6">
      {{ article.subtitle }}
      <a href="{{ article.url }}">read more...</a>
    </div>
  </div>
  <hr>
{% endfor %}

<style>
 hr { border: 1px solid #DFDFDF; }
</style>