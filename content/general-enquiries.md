---
title: General enquiries
sections:
  - type: form_section
    title: Section Title
    subtitle: This is the optional subtitle
    title_align: center
    content: >-
      ### Billing

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl ligula, cursus id molestie vel, maximus aliquet risus. Vivamus in nibh fringilla, fringilla.

      ### Privacy

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl ligula, cursus id molestie vel, maximus aliquet risus. Vivamus in nibh fringilla, fringilla.
    content_align: left
    form_position: right
    form_width: fifty
    form_layout: inline
    enable_card: true
    form_id: contact-form
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
      - input_type: select
        name: subject
        label: Subject
        default_value: Please select
        options:
          - Error on the site
          - Sponsorship
          - Other
      - input_type: textarea
        name: message
        label: Message
        default_value: Your message
      - input_type: checkbox
        name: consent
        label: I understand that this form is storing my submitted information so I can be contacted.
        is_required: true
    submit_label: Send Message
    align_vert: top
    padding_top: large
    padding_bottom: large
    background_color: secondary
layout: advanced
---
