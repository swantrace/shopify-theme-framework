/* eslint-disable no-unused-vars */
export default {
  demo: ({ helpers, hook, settings, locales, shopify }) => (element) => {
    const { html } = helpers;
    return html``;
  },
  'default-main': ({ helpers, hook, settings, locales, shopify }) => (
    element
  ) => {
    const { html } = helpers;
    return html`<div class="wrapper">
      ${settings.header.nav_below_logo
        ? html`<div class="grid--full">
              <div class="grid__item">
                ${shopify.requestPageType === 'index'
                  ? html`<h1
                      class="site-header__logo${!settings.header.logo &&
                      (settings.header.left_aligned_logo ||
                        !settings.header.nav_below_logo)
                        ? ` post-large--left`
                        : ''}"
                      itemscope
                      itemtype="http://schema.org/Organization"
                    >
                      ${settings.header.logo
                        ? html`<noscript>
                              {% capture image_size %}{{ logo_width | escape
                              }}x{% endcapture %}
                              <div class="logo__image-wrapper">
                                {{ section.settings.logo | img_url: image_size |
                                img_tag: shop.name }}
                              </div>
                            </noscript>
                            <div class="logo__image-wrapper supports-js">
                              <a
                                href="{{ routes.root_url }}"
                                itemprop="url"
                                style="padding-top:{{ 1 | divided_by: section.settings.logo.aspect_ratio | times: 100}}%;"
                              >
                                {% assign img_url = section.settings.logo |
                                img_url: '1x1' | replace: '_1x1.', '_{width}x.'
                                %}
                                <img
                                  class="logo__image lazyload"
                                  src="{{ section.settings.logo | img_url: '300x300' }}"
                                  data-src="{{ img_url }}"
                                  data-widths="[120, 180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2048]"
                                  data-aspectratio="{{ section.settings.logo.aspect_ratio }}"
                                  data-sizes="auto"
                                  alt="{{ shop.name | escape }}"
                                  itemprop="logo"
                                />
                              </a>
                            </div>`
                        : html` <a href="{{ routes.root_url }}" itemprop="url">
                            {{ shop.name }}
                          </a>`}
                    </h1>`
                  : html`<div
                      class="h1 site-header__logo${!settings.header.logo &&
                      (settings.header.left_aligned_logo ||
                        !settings.header.nav_below_logo)
                        ? ` post-large--left`
                        : ''}"
                      itemscope
                      itemtype="http://schema.org/Organization"
                    >
                      ${settings.header.logo
                        ? html`<noscript>
                              {% capture image_size %}{{ logo_width | escape
                              }}x{% endcapture %}
                              <div class="logo__image-wrapper">
                                {{ section.settings.logo | img_url: image_size |
                                img_tag: shop.name }}
                              </div>
                            </noscript>
                            <div class="logo__image-wrapper supports-js">
                              <a
                                href="{{ routes.root_url }}"
                                itemprop="url"
                                style="padding-top:{{ 1 | divided_by: section.settings.logo.aspect_ratio | times: 100}}%;"
                              >
                                {% assign img_url = section.settings.logo |
                                img_url: '1x1' | replace: '_1x1.', '_{width}x.'
                                %}
                                <img
                                  class="logo__image lazyload"
                                  src="{{ section.settings.logo | img_url: '300x300' }}"
                                  data-src="{{ img_url }}"
                                  data-widths="[120, 180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2048]"
                                  data-aspectratio="{{ section.settings.logo.aspect_ratio }}"
                                  data-sizes="auto"
                                  alt="{{ shop.name | escape }}"
                                  itemprop="logo"
                                />
                              </a>
                            </div>`
                        : html` <a href="{{ routes.root_url }}" itemprop="url">
                            {{ shop.name }}
                          </a>`}
                    </div>`}
              </div>
            </div>
            <div class="grid--full medium-down--hide">
              <div class="grid__item">
                <!-- <nav>
  <ul class="site-nav" id="AccessibleNav">
    {% for link in site-nav.links %}
      {% if link.links != blank %}
      {% assign parent_index = forloop.index %}
        <li
          class="site-nav--has-dropdown {% if link.active %}site-nav--active{% endif %}"
          aria-haspopup="true">
          <a
            href="{{ link.url }}"
            class="site-nav__link"
            data-meganav-type="parent"
            aria-controls="MenuParent-{{ parent_index }}"
            aria-expanded="false"
            {% unless request.page_type == 'index' %}{% if link.active %}aria-current="page"{% endif %}{% endunless%}>
              {{ link.title | escape }}
              <span class="icon icon-arrow-down" aria-hidden="true"></span>
          </a>
          <ul
            id="MenuParent-{{ parent_index }}"
            class="site-nav__dropdown {% if link.levels == 2 %}site-nav--has-grandchildren{% endif %}"
            data-meganav-dropdown>
            {% for childlink in link.links %}
              {% if childlink.links != blank %}
              {% assign child_index = forloop.index %}
                <li
                  class="site-nav--has-dropdown site-nav--has-dropdown-grandchild {% if childlink.active %}site-nav--active{% endif %}"
                  aria-haspopup="true">
                  <a
                    href="{{ childlink.url }}"
                    class="site-nav__link"
                    aria-controls="MenuChildren-{{ parent_index }}-{{ child_index }}"
                    data-meganav-type="parent"
                    {% unless request.page_type == 'index' %}{% if childlink.active %}aria-current="page"{% endif %}{% endunless%}
                    tabindex="-1">
                      {{ childlink.title | escape }}
                      <span class="icon icon-arrow-down" aria-hidden="true"></span>
                  </a>
                  <ul
                    id="MenuChildren-{{ parent_index }}-{{ child_index }}"
                    class="site-nav__dropdown-grandchild"
                    data-meganav-dropdown>
                    {% for grandchildlink in childlink.links %}
                      <li {% if grandchildlink.active %} class="site-nav--active"{% endif %}>
                        <a
                          href="{{ grandchildlink.url }}"
                          class="site-nav__link"
                          data-meganav-type="child"
                          {% unless request.page_type == 'index' %}{% if grandchildlink.active %}aria-current="page"{% endif %}{% endunless %}
                          tabindex="-1">
                            {{ grandchildlink.title | escape }}
                          </a>
                      </li>
                    {% endfor %}
                  </ul>
                </li>
              {% else %}
                <li {% if childlink.active %} class="site-nav--active"{% endif %}>
                  <a
                    href="{{ childlink.url }}"
                    class="site-nav__link"
                    data-meganav-type="child"
                    {% if childlink.active %}aria-current="page"{% endif %}
                    tabindex="-1">
                      {{ childlink.title | escape }}
                  </a>
                </li>
              {% endif %}
            {% endfor %}
          </ul>
        </li>
      {% else %}
        <li {% if link.active %} class="site-nav--active"{% endif %}>
          <a
            href="{{ link.url }}"
            class="site-nav__link"
            data-meganav-type="child"
            {% unless request.page_type == 'index' %}{% if link.active %}aria-current="page"{% endif %}{% endunless%}>
              {{ link.title | escape }}
          </a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</nav> -->
              </div>
            </div>`
        : html`<div class="grid--full post-large--display-table">
            <div
              class="grid__item post-large--one-third post-large--display-table-cell"
            >
              ${shopify.requestPageType === 'index'
                ? html`<h1
                    class="site-header__logo${!settings.header.logo &&
                    (settings.header.left_aligned_logo ||
                      !settings.header.nav_below_logo)
                      ? ` post-large--left`
                      : ''}"
                    itemscope
                    itemtype="http://schema.org/Organization"
                  ></h1>`
                : html`<div
                    class="h1 site-header__logo${!settings.header.logo &&
                    (settings.header.left_aligned_logo ||
                      !settings.header.nav_below_logo)
                      ? ` post-large--left`
                      : ''}"
                    itemscope
                    itemtype="http://schema.org/Organization"
                  ></div>`}
              <!-- {% if request.page_type == 'index' %}
              <h1 class="site-header__logo{% if section.settings.logo == blank %}{% unless section.settings.left_aligned_logo == false and section.settings.nav_below_logo %} post-large--left{% endunless %}{% endif %}" itemscope itemtype="http://schema.org/Organization">
            {% else %}
              <div class="h1 site-header__logo{% if section.settings.logo == blank %}{% unless section.settings.left_aligned_logo == false and section.settings.nav_below_logo %} post-large--left{% endunless %}{% endif %}" itemscope itemtype="http://schema.org/Organization">
            {% endif %}
              {% if section.settings.logo != blank %}
                <noscript>
                  {% capture image_size %}{{ logo_width | escape }}x{% endcapture %}
                  <div class="logo__image-wrapper">
                    {{ section.settings.logo | img_url: image_size | img_tag: shop.name }}
                  </div>
                </noscript>
                <div class="logo__image-wrapper supports-js">
                  <a 
                    href="{{ routes.root_url }}" 
                    itemprop="url" 
                    style="padding-top:{{ 1 | divided_by: section.settings.logo.aspect_ratio | times: 100}}%;"
                  >
                    {% assign img_url = section.settings.logo | img_url: '1x1' | replace: '_1x1.', '_{width}x.' %}
                    <img class="logo__image lazyload"
                         src="{{ section.settings.logo | img_url: '300x300' }}"
                         data-src="{{ img_url }}"
                         data-widths="[120, 180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2048]"
                         data-aspectratio="{{ section.settings.logo.aspect_ratio }}"
                         data-sizes="auto"
                         alt="{{ shop.name | escape }}"
                         itemprop="logo">
                  </a>
                </div>
              {% else %}
                <a href="{{ routes.root_url }}" itemprop="url">
                  {{ shop.name }}
                </a>
              {% endif %}
            {% if request.page_type == 'index' %}
              </h1>
            {% else %}
              </div>
            {% endif %}-->
            </div>
            <div
              class="grid__item post-large--two-thirds post-large--display-table-cell medium-down--hide"
            >
              <!-- <nav>
  <ul class="site-nav" id="AccessibleNav">
    {% for link in site-nav.links %}
      {% if link.links != blank %}
      {% assign parent_index = forloop.index %}
        <li
          class="site-nav--has-dropdown {% if link.active %}site-nav--active{% endif %}"
          aria-haspopup="true">
          <a
            href="{{ link.url }}"
            class="site-nav__link"
            data-meganav-type="parent"
            aria-controls="MenuParent-{{ parent_index }}"
            aria-expanded="false"
            {% unless request.page_type == 'index' %}{% if link.active %}aria-current="page"{% endif %}{% endunless%}>
              {{ link.title | escape }}
              <span class="icon icon-arrow-down" aria-hidden="true"></span>
          </a>
          <ul
            id="MenuParent-{{ parent_index }}"
            class="site-nav__dropdown {% if link.levels == 2 %}site-nav--has-grandchildren{% endif %}"
            data-meganav-dropdown>
            {% for childlink in link.links %}
              {% if childlink.links != blank %}
              {% assign child_index = forloop.index %}
                <li
                  class="site-nav--has-dropdown site-nav--has-dropdown-grandchild {% if childlink.active %}site-nav--active{% endif %}"
                  aria-haspopup="true">
                  <a
                    href="{{ childlink.url }}"
                    class="site-nav__link"
                    aria-controls="MenuChildren-{{ parent_index }}-{{ child_index }}"
                    data-meganav-type="parent"
                    {% unless request.page_type == 'index' %}{% if childlink.active %}aria-current="page"{% endif %}{% endunless%}
                    tabindex="-1">
                      {{ childlink.title | escape }}
                      <span class="icon icon-arrow-down" aria-hidden="true"></span>
                  </a>
                  <ul
                    id="MenuChildren-{{ parent_index }}-{{ child_index }}"
                    class="site-nav__dropdown-grandchild"
                    data-meganav-dropdown>
                    {% for grandchildlink in childlink.links %}
                      <li{% if grandchildlink.active %} class="site-nav--active"{% endif %}>
                        <a
                          href="{{ grandchildlink.url }}"
                          class="site-nav__link"
                          data-meganav-type="child"
                          {% unless request.page_type == 'index' %}{% if grandchildlink.active %}aria-current="page"{% endif %}{% endunless %}
                          tabindex="-1">
                            {{ grandchildlink.title | escape }}
                          </a>
                      </li>
                    {% endfor %}
                  </ul>
                </li>
              {% else %}
                <li{% if childlink.active %} class="site-nav--active"{% endif %}>
                  <a
                    href="{{ childlink.url }}"
                    class="site-nav__link"
                    data-meganav-type="child"
                    {% if childlink.active %}aria-current="page"{% endif %}
                    tabindex="-1">
                      {{ childlink.title | escape }}
                  </a>
                </li>
              {% endif %}
            {% endfor %}
          </ul>
        </li>
      {% else %}
        <li{% if link.active %} class="site-nav--active"{% endif %}>
          <a
            href="{{ link.url }}"
            class="site-nav__link"
            data-meganav-type="child"
            {% unless request.page_type == 'index' %}{% if link.active %}aria-current="page"{% endif %}{% endunless%}>
              {{ link.title | escape }}
          </a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</nav> -->
            </div>
          </div>`}
    </div>`;
  },
};
