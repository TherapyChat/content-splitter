<template>
  <div id="app">
    <mq-layout mq="sm">
      <main
        class="content-splitter mobile">
        <article
          class="mobile__article"
          v-for="item in items"
          :key="item.id">
          <header class="mobile__header">{{ item.title }}</header>
          <section class="mobile__content">
            <p class="article-highlight" v-html="item.headerText"></p>
            <div class="article-text" v-html="item.contentText"></div>
          </section>
        </article>
      </main>
    </mq-layout>
    <mq-layout mq="md+">
      <main
        class="content-splitter desktop">
        <nav class="desktop__menu">
          <ul class="menu" role="menu">
            <li 
              v-for="(item, index) in items"
              @click="selectItem(index)"
              :class="{ active: activeIndex === index }"
              :key="item.id">{{ item.title }}
            </li>
          </ul>
        </nav>
        <nav class="desktop__pager" aria-label="component navigation">
          <ul class="pagination" role="pagination">
            <li 
              v-for="(item, index) in items"
              :id="index"
              :key="item.id">
                <div 
                  class="page-link"
                  :class="{ active: activeIndex === index }"
                  @click="selectItem(index)">
                    <span>0{{ item.id }}</span>
                </div>
            </li>
          </ul>
        </nav>
        <article
          class="article desktop__article"
          v-for="item in items"
          :key="item.id">
          <header class="desktop__header">
            <img
              v-if="item.headerImg !== ''"
              :src="require(`@/assets/img/${item.headerImg}.png`)" />
            {{ item.headerText }}
          </header>
          <div
            class="desktop__content"
            v-html="item.contentText"></div>
        </article>
      </main>
    </mq-layout>
  </div>
</template>

<script>

import VueMq from 'vue-mq'
import Vue from 'vue'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 800,
    md: 1250
  }
})

export default {
  name: 'app',
  props: {
    items: {
      type: Array,
      default: () => [
        {
          'id': 1,
          'title': 'Lorem ipsum dolor sit amet',
          'headerText': 'Lorem ipsum dolor sit amet consectetuer adipiscing elit.',
          'headerImg': 'logo',
          'headerPreloadImg': 'logo',
          'contentText': 'Lorem ipsum dolor sit amet consectetuer adipiscing elit. Vehicula orci odio taciti porta scelerisque aliquet metus cras ve rutrum mus donec mauris hendrerit. Hac curabitur dis tempor vel semper ve nullam dictumst. Dictum blandit sapien ornare condimentum odio taciti in posuere. Potenti magnis vestibulum ullamcorper ligula at blandit justo parturient luctus montes viverra lorem volutpat laoreet iaculis nulla.'
        },
        {
          'id': 2,
          'title': 'Sed ipsum nulla nullam',
          'headerText': 'Sed ipsum nulla nullam mollis morbi ut magnis magna aliquet nam vel ornare viverra aliquam magna sollicitudin.',
          'headerImg': 'logo',
          'headerPreloadImg': 'logo',
          'contentText': '<p>Sed ipsum nulla nullam mollis morbi ut magnis magna aliquet nam vel ornare viverra aliquam magna sollicitudin. Praesent risus vulputate praesent id risus ve malesuada fusce id magnis. Habitant mi mus. Nisi faucibus morbi sodales facilisi blandit. Erat nam hymenaeos a diam facilisis semper.</p><p>Pellentesque egestas elementum commodo lobortis rhoncus venenatis? Vitae nec a iaculis urna euismod porta fusce pede est. Risus platea viverra lacus rhoncus odio erat mattis scelerisque ante metus pretium felis.</p>'
        }
      ]
    }
  },
  data () {
    return {
      articles: [],
      activeIndex: 0
    }
  },
  mounted: function () {
    this.setArticles()
  },
  watch: {
    $mq: function () {
      var vm = this
      setTimeout(function () {
        vm.setArticles()
      })
    }
  },
  methods: {
    selectItem: function (selectedIndex) {
      var allowedItemChange = selectedIndex !== this.activeIndex && selectedIndex >= 0 && selectedIndex < this.articles.length
      if (allowedItemChange) {
        this.removeActiveClass(this.activeIndex)
        this.addActiveClass(selectedIndex)
        this.activeIndex = selectedIndex
      }
    },
    setArticles: function () {
      this.articles = []
      this.articles = this.$mq === 'sm' ? this.$el.querySelectorAll('.mobile__article') : this.$el.querySelectorAll('.desktop__article')
      this.addActiveClass(this.activeIndex)
    },
    removeActiveClass: function (index) {
      this.articles[index].classList.remove('active')
    },
    addActiveClass: function (index) {
      this.articles[index].classList.add('active')
    }
  }
}
</script>

<style
>
/* Replace :host with :root in develop mode */

:host {
  /* COLORS */
  --white-color: #FFF;
  --lightgrey-color: rgb(47,44,133, 0.3); /* #2f2c85; */
  --darkblue-color: rgb(47,44,133, 0.84); /* #2f2c85; */
  --darkerblue-color: rgb(21,38,94); /* #15265e */
  --purple-color: #6467d4;

  /* SIZES */
  --desktop-width: 1093px;
  --desktop-height: 515px;
  --mobile-width: 351px;
  --mobile-height: auto;
  --pagination-item-width: 34px;
  --pagination-item-height: 34px;
  --header-img-width: 117px;
  --header-img-height: 107px;

  /* FONT-SIZES */
  --ten-px-font: .625em;
  --eleven-px-font: .688em;
  --twelve-px-font: .75em;
  --thirteen-px-font: .813em;
  --fourteen-px-font: .875em;
  --fifteen-px-font: .938em;
  --seventeen-px-font: 1.063em;
  --eighteen-px-font: 1.125em;
  --nineteen-px-font: 1.1875em;
  --twenty-px-font: 1.250em;

  /* MARGINS */
  --left-margin: 127px;
  --top-margin: 67px;
  --mobile-margin: 12px;

  /* FONT-FACES */
  @font-face {
    font-family: 'Circular';
    src: url('./assets/fonts/lineto-circular-book.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Circular-Light';
    src: url('./assets/fonts/Circular-Light.ttf') format('ttf');
    font-weight: 300;
    font-style: normal;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  font-family: 'Circular', Helvetica, Arial, sans-serif;
  font-size: 16px; 
}

* {
  box-sizing: border-box;
}

.content-splitter {
  margin: 0 auto;
  background-color: var(--white-color);
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(100, 103, 212, 0.11);
}

/* MOBILE */
.mobile {
  width: auto;
  height: var(--mobile-height);
  display: block;
  margin-right: var(--mobile-margin);
  margin-left: var(--mobile-margin);
  padding: 30px 12px;
}

  .mobile__header,
  .mobile__content {
    width: 100%;
    display: block;
  }

  .mobile__header {
    margin-bottom: 20px;
    font-size: 32px;
    color: var(--darkerblue-color);
    font-family: 'Circular-Light', Helvetica, Arial, sans-serif;
  }

  .mobile__content {
    margin-bottom: 40px;
    font-size: var(--nineteen-px-font);
    color: var(--darkblue-color);
  }

    .article-highlight {
      font-weight: 500;
    }

    .article-text {
      font-family: 'Circular-Light', Helvetica, Arial, sans-serif;
    }

/* DESKTOP */
.desktop {
  width: var(--desktop-width);
  height: var(--desktop-height);
  display: grid;
  grid-template-columns: auto 585px;
  grid-template-rows: 217px 208px 90px;
}

  .desktop__menu {
    grid-area: 1 / 1 / 3 / 2;
    padding-top: var(--top-margin);
  }

    .menu,
    .pagination {
      list-style-type: none;
      margin-top: 0;
      padding: 0;
      margin-left: var(--left-margin);
    }

      .menu li {
        color: var(--lightgrey-color);
        margin-bottom: 20px;
        font-size: var(--nineteen-px-font);
        line-height: 1.31;
        max-width: 325px;
        font-weight: 300;
        cursor: pointer;
        font-family: 'Circular-Light', Helvetica, Arial, sans-serif;
      } 

      .menu li.active {
        font-weight: 400;
        font-size: 2em;
        color: var(--darkerblue-color);
      }

      .pagination li {
        display: inline-block;
        width: var(--pagination-item-width);
        height: var(--pagination-item-height);
        cursor: pointer;
      }

      .page-link {
        background-color: var(--white-color);
        color: var(--purple-color);
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--pagination-item-height);
        text-decoration: none;
      }

      .page-link.active,
      .page-link:hover {
        background-color: var(--purple-color);
        color: var(--white-color);
      }

        .page-link span {
          font-size: var(--ten-px-font);
        }

  .desktop__pager {
    grid-area: 3 / 1 / 4 / 2;
  }

  .desktop__article:not(.active) {
    display: none;
  }

  .desktop__article {
    grid-area: 1 / 2 / 4 / 3;
  }

  .desktop__header {
    height: 217px;
    padding-top: var(--top-margin);
    padding-right: 128px;
    display: flex;
    font-weight: 500;
    line-height: 1.32;
    color: var(--darkblue-color);
    font-size: var(--nineteen-px-font);
  }

    .desktop__header img {
      width: var(--header-img-width);
      height: var(--header-img-height);
      max-width: var(--header-img-width);
      max-height: var(--header-img-height);
      flex: 1 0 auto;
      margin-right: 20px;
    }

  .desktop__content {
    height: 298px;
    padding-right: 70px;
    color: var(--darkblue-color);
    font-weight: 300;
    line-height: 1.32;
    font-size: var(--nineteen-px-font);
    font-family: 'Circular-Light', Helvetica, Arial, sans-serif;
  }
</style>
