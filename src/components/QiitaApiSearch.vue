<template>
  <div>
    <p>関連記事を投稿日時の新しい順に100件表示し、ページ下部までスクロールすると次の100件を表示します。</p>
    <a>
      <input type="text" v-model="keyword" placeholder="キーワードを入力">
      <button class="btn btn-info" v-on:click="clear">クリア</button>
    </a>
    <p> ex.. {{ example }}</p>
    <p>{{ message }}</p>
    <div class="container-fluid">
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
        <tbody>
        <tr v-for="(item, $index) in list" :key="$index">
          <!--<td><a :href="item.url">{{item.title}}</a></td>-->
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
        </tr>
        </tbody>

      </table>
      <infinite-loading slot="append"
                        :identifier="infiniteId"
                        @infinite="infiniteHandler"
                        spinner="bubbles"
                        force-use-infinite-wrapper=".table__body-wrapper">
        <div slot="no-more">これ以上投稿記事はありません。</div>
        <div slot="no-results">該当する投稿はありません。</div>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

const api = 'https://qiita.com/api/v2/items'

export default {
  name: 'qiitaapisearch',
  components: {
    InfiniteLoading
  },
  data () {
    return {
      page: 1,
      per_page: 100,
      list: [],
      message: '',
      keyword: '',
      infiniteId: +new Date(),
      example: 'Python, Django, Vue, Aws, Docker, Golang...'

    }
  },

  // keyword入力フィールドの監視プロパティ
  watch: {
    keyword: function (newKeyword, oldkeyword) {
      console.log(newKeyword)
      this.debouncedGetPosts()
    }
  },

  created: function () {
    this.keyword = ''
    this.debouncedGetPosts = _.debounce(this.getPosts, 1000)
  },

  methods: {
    infiniteHandler ($state) {
      this.keyword = this.keyword.toLowerCase()
      var params = {page: this.page, per_page: this.per_page, query: this.keyword}
      const headers = {
        'content-type': 'application/json',
        'charset': 'utf-8',
        'Authorization': 'Bearer ' + 'cf49231f2c378eef468bf5435d9d6bcd632ccf0a'
      }
      axios.get(api, {params}, {headers}
      ).then(({data}) => {
        if (data.length) {
          this.page += 1
          this.list.push(...data)
          $state.loaded()
        } else {
          $state.complete()
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    // InfiniteLoadingの再リロード
    getPosts () {
      this.page = 1
      this.list = []
      this.infiniteId += 1
    },

    // keyword,listのクリア
    clear: function () {
      this.keyword = ''
      this.list = []
    }
  },

  filters: {
    // 日時フォーマット変換
    moment: function (date) {
      return moment(date).format('YYYY/MM/DD HH:mm')
    },
    // ローカルフィルタ引数(length以上はsuffix表示)
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
