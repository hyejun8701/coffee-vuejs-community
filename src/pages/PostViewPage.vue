<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post" />
    <p v-else>게시글 불러오는 중...</p>
    <router-link :to="{ name: 'PostEditPage', params: { postId } }">수정</router-link>
    <button @click="onDelete">삭제</button>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    <comment-list v-if="post" :comments="post.comments" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import PostView from '@/components/PostView'
import CommentList from '@/components/CommentList'
import api from '@/api'

export default {
  name: 'PostViewPage',
  components: {
    PostView,
    CommentList
  },
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState([
      'post'
    ])
  },
  created () {
    this.fetchPost(`${this.postId}`).catch(err => {
      alert(err.response.data.msg)
      this.$router.back()
    })
  },
  methods: {
    ...mapActions([
      'fetchPost'
    ]),
    onDelete () {
      const { id } = this.post
      console.log(id)
      api.delete(`/posts/${id}`).then(res => {
        alert('게시물이 성공적으로 삭제되었습니다.')
        this.$router.push({ name: 'PostListPage' })
      }).catch(err => {
        if (err.response.state === 401) {
          alert('로그인이 필요합니다.')
          this.$router.push({name: 'Signin'})
        } else {
          alert(err.response.data.msg)
        }
      })
    }
  }
}
</script>
