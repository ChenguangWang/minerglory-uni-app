<template>
  <view>
    <u-upload ref="uUpload" :file-list="fileList" :max-count="maxFileCount" :auto-upload="false" :max-size="maxFileSize" @on-choose-complete="onChooseComplete"></u-upload>
  </view>
</template>

<script>
import { request } from '@/utils/request';

export default {
  props: {
    maxFileCount: {
      type: Number,
      default: 1
    },
    maxFileSize: {
      type: Number,
      default: 5 * 1024 * 1024
    }
  },
  data() {
    return {
      fileList: [],
      uploadUrl: '/api/blade-resource/oss/endpoint/put-file-attach',
      formData: {
        bucketName: 'taosuanli'
      }
    };
  },
  methods: {
    onChooseComplete(list) {
      this.fileList = list;
      this.uploadFiles();
    },
    async uploadFiles() {
      for (let i = 0; i < this.fileList.length; i++) {
        const { file,url } = this.fileList[i];
        try {
          await this.uploadSingleFile(file,url);
          this.$refs.uUpload.lists[i].progress = 100;
          this.$emit('success', file, i, this.fileList);
        } catch (err) {
          this.$refs.uUpload.lists[i].error = true;
          this.$emit('error', err, i, this.fileList);
        }
      }
    },
    uploadSingleFile(file,url) {
      console.log(`output->file`, file);
      request({
        url: '/api/blade-resource/oss/endpoint/put-file-attach',
        formData: this.formData,
        filePath: url,
      }).then((res) => {
        Indicator.close();
        // console.log("res.data.data路径:",res.data.data)
        this.picList.push(res.data.data.link);
        console.log('this.picList:', this.picList);
        this.$emit('getSonData', this.picList[0]);
      });
    }
  }
};
</script>
