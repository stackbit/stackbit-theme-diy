---
title: News
sections:
  - type: hero_section
    title: All Posts In News
    subtitle: The optional subtitle
    align: left
    padding_top: medium
    padding_bottom: none
    background_color: none
  - type: blog_feed_section
    blog_feed_cols: three
    enable_cards: true
    show_recent: false
    category: data/categories/news.yaml
    show_date: true
    show_categories: true
    show_author: true
    show_excerpt: true
    show_image: true
    image_has_border: false
    padding_top: medium
    padding_bottom: large
    has_border: true
  - type: form_section
    title: Inline Form
    title_align: center
    content: >-
      Subscribe to our newsletter to make sure you don't miss anything.
    content_align: center
    form_position: bottom
    form_layout: inline
    form_id: subscribeForm
    form_fields:
      - input_type: text
        name: name
        label: Name
        default_value: Your name
        is_required: true
      - input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
    submit_label: Subscribe
    padding_top: small
    padding_bottom: small
    has_border: false
    background_color: secondary
layout: advanced
---
