<template>
  <div class="qiitasearch">
    <p>{{ sample }}</p>
    <p>
      <input type="text" v-model="keyword">
    </p>
    <button v-on:click="getAnswer">page1</button>
    <button v-on:click="getAnswer2">page2</button>
    <button v-on:click="getAnswer3">page3</button>
    <button v-on:click="getAnswer4">page4</button>
    <button v-on:click="getAnswer5">page5</button>
    <p>{{ message }}</p>
    <div class="container-fluid ">
      <table class="table table-hover">
        <thead class="thead-light">
        <tr>
          <th>タイトル</th>
          <th>投稿日</th>
          <th>いいね数</th>
          <th>投稿者Twitter</th>
          <th>投稿者Link</th>
        </tr>
        </thead>
        <tbody v-for="(item, key, index) in items" :key="index">
        <tr>
          <!--<td><a v-bind:href="item.url" target="_blank">{{ item.title | readMore(70, "...")}}</a></td>-->
          <td v-if="item.title.length > 60"><a v-bind:href="item.url" target="_blank">{{ item.title | readMore(60,
            '...') }}</a></td>
          <td v-else><a v-bind:href="item.url" target="_blank">{{ item.title }}</a></td>
          <td>{{ item.created_at | moment }}</td>
          <td>{{ item.likes_count }}</td>

          <td v-if="item.user.twitter_screen_name">https://twitter.com/{{ item.user.twitter_screen_name}}</td>
          <td v-else></td>
          <td><a v-bind:href="item.user.website_url">{{ item.user.website_url }}</a></td>
          <!--<td>{{ item.title | string_count }}</td>-->

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
      message: '',
      sample: 'python, django, vue, aws, docker, golang'
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
      var params = {page: 1, per_page: 100, query: this.keyword}
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
    },
    getAnswer2: function () {
      this.message = 'Loading...'
      var vm = this
      var params = {page: 2, per_page: 100, query: this.keyword}
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
    },
    getAnswer3: function () {
      this.message = 'Loading...'
      var vm = this
      var params = {page: 3, per_page: 100, query: this.keyword}
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
    },
    getAnswer4: function () {
      this.message = 'Loading...'
      var vm = this
      var params = {page: 4, per_page: 100, query: this.keyword}
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
    },
    getAnswer5: function () {
      this.message = 'Loading...'
      var vm = this
      var params = {page: 5, per_page: 100, query: this.keyword}
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
  filters: {
    // 日時フォーマット定義
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
