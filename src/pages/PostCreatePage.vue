<template>
  <div class="post-create-page">
    <h3>게시물 작성하기</h3>
    <post-create-form @submit="onSubmit" />
  </div>
</template>
<script>
import PostCreateForm from '@/components/PostCreateForm'
import api from '@/api'

export default {
  name: 'PostCreatePage',
  components: {
    PostCreateForm
  },
  methods: {
    async onSubmit (payload) {
      console.log(payload)
      const { title, contents } = payload
      try {
        const res = await api.post('/posts', { title, contents })
        this.$router.push({ name: 'PostViewPage', params: { postId: res.data.id.toString() } })
      } catch (err) {
        if (err.response.state === 400) {
          this.$router.push({ name: 'Signin' })
        } else {
          alert(err.response.data.msg)
        }
      }
    }
  }
}
</script>
