<template>
  <div class="qiitasearch">
    <p>
      <input type="text" v-model="keyword" placeholder="キーワードを入力">
    </p>
    <p> ex.. {{ example }}</p>
    <p>{{ message }}</p>

    <div class="container-fluid ">
      <table class="table table-hover">
        <thead class="thead-light">
        <tr>
          <th>タイトル</th>
          <th>投稿日</th>
          <th>投稿者ID</th>
          <th>投稿者Twitter</th>
          <th>投稿者Webサイト</th>
          <th>いいね数</th>
          <th>コメント数</th>
          <!--<th>閲覧数</th>-->
        </tr>
        </thead>
        <tbody v-for="(item, key, index) in items" :key="index">
        <tr>
          <!--<td><a v-bind:href="item.url" target="_blank">{{ item.title | readMore(70, "...")}}</a></td>-->
          <td v-if="item.title.length > 60"><a v-bind:href="item.url" target="_blank">{{ item.title | readMore(60,
            '...') }}</a></td>
          <td v-else><a v-bind:href="item.url" target="_blank">{{ item.title }}</a></td>
          <td>{{ item.created_at | moment }}</td>
          <td>{{ item.user.id }}</td>
          <td v-if="item.user.twitter_screen_name">https://twitter.com/{{ item.user.twitter_screen_name}}</td>
          <td v-else></td>
          <td><a v-bind:href="item.user.website_url">{{ item.user.website_url }}</a></td>
          <td>{{ item.likes_count }}</td>
          <td>{{ item.comments_count }}</td>
          <!--<td>{{ item.page_views_count }}</td>-->
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'QiitaSearch',
  data () {
    return {
      items: '',
      keyword: '',
      page: 1,
      per_page: 100,
      message: '',
      example: 'python, django, vue, aws, docker, golang...'
    }
  },

  // 監視プロパティ
  watch: {
    keyword: function (newKeyword, oldkeyword) {
      // console.log(newKeyword)
      this.message = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },

  created: function () {
    this.keyword = ''
    this.getAnswer()
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },

  destroyed: function () {
    window.removeEventListener('scroll', this.scroll)
  },

  methods: {
    getAnswer: function () {
      // 検索テキストが入力されてない場合
      if (this.keyword === '') {
        this.items = null
        this.message = ''
        return
      }

      this.message = 'Loading...'
      var vm = this
      // 検索パラメータ
      var params = {page: this.page, per_page: this.per_page, query: this.keyword}
      // QiitaAPIからデータ取得
      axios.get('https://qiita.com/api/v2/items', {params})
        .then(function (response) {
          // console.log(response)
          vm.items = response.data
        })
        .catch(function (error) {
          vm.message = 'Error!' + error
        })
        .finally(function () {
          vm.message = ''
        })
    }
  },

  // 自動でページ読み込み？？
  //   pager: function () {
  //     if (window.scrollY + window.innerHeight === document.documentElement.clientHeight) {
  //     // if(aaaa.getBoundingClientRect().bottom < window.innerHeight){
  //       this.page++
  //       this.getAnswer()
  //     }
  //   }
  // },
  //
  // mounted () {
  //   window.addEventListener('scroll', this.pager)
  //   this.pager()
  // },

  filters: {
    // 日時フォーマット変換
    moment: function (date) {
      return moment(date).format('YYYY/MM/DD HH:mm')
    },
    // ローカルフィルタ引数
    readMore: function (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  }
}
</script>

<style scoped>
  table {
    table-layout: auto;
  }

  /*.table {*/
    /*border: 1px solid #b4b6b8;*/
  /*}*/

  .table tr td {
    border: 1px solid #b4b6b8;
  }
    .table tr th {
    border: 1px solid #b4b6b8;
  }

  .container-fluid {
    padding-right: 50px;
    padding-left: 50px;
    margin-right: auto;
    margin-left: auto;
  }

  p {
    font-size: large;
  }
</style>
