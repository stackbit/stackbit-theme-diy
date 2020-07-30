---
title: Blog
sections:
  - type: hero_section
    title: Blog
    subtitle: The optional subtitle
    align_horiz: center
    padding_top: medium
    padding_bottom: small
    background:
      background_color: none
  - type: blog_feed_section
    show_recent: false
    posts_per_row: three
    enable_cards: true
    show_image: true
    show_categories: true
    show_author: true
    show_excerpt: true
    has_border: true
    padding_top: none
    padding_bottom: large
  - type: form_section
    title: Inline Form
    title_align_horiz: center
    content: >-
      Subscribe to our newsletter to make sure you don't miss anything.
    content_align_horiz: center
    form_position: bottom
    form_layout: inline
    form_id: subscribeForm
    form_fields:
      - input_type: name
        name: text
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
    background_color: secondary
layout: advanced
---
