<template>
  <div class="qiitasearch">
    <p>
      <input type="text" v-model="keyword">
    </p>
    <p>
      {{ message }}
    </p>
    <ul>
      <li v-for="(item, key, index) in items" :key="index">
        <a v-bind:href="item.url" target="_blank">{{ item.title }}</a>
        <p>更新日:{{ item.updated_at }}</p>
        <p>いいね数:{{ item.likes_count }}</p>
        <div v-if="item.user.twitter_screen_name">
          <a>投稿者ツイッター:</a>
          <a v-bind:href="item.user.twitter_screen_name">https://twitter.com/{{ item.user.twitter_screen_name}}</a><br>
        </div>
        <div v-if="item.user.website_url">
          <a>投稿者リンク:</a>
          <a v-bind:href="item.user.website_url">{{item.user.website_url}}</a><br>
        </div>
        ///////////////////////////////////////////////////////////////////////////////
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'QiitaSearch',
  data () {
    return {
      items: '',
      keyword: '',
      message: ''
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
      // qiita APIからデータ取得
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
  }
}
</script>

<style scoped>

</style>
