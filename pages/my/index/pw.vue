<template>
    <section>
        <!-- 修改密码 -->
        <h4>修改密码</h4>
        <div class="form">
            <ul class="form_item">
                <li>
                    <span class="title">当前密码:</span>
                    <input type="password" placeholder="请输入当前登录密码" :class="!verification.original_pass?'':'borderColor'"  v-model="params.original_pass">
                </li>
                <li>
                    <span class="title">新密码:</span>
                    <input type="password" placeholder="请输入新密码" :class="!verification.new_pass?'':'borderColor'"  v-model="params.new_pass">
                </li>
                <li>
                    <span class="title">确认新密码:</span>
                    <input type="password" placeholder="请再次输入您的新密码" :class="!verification.repeat_pass?'':'borderColor'"  v-model="params.repeat_pass">
                </li>
                <li>
                    <span class="title"></span>
                    <a href="javascript:;" class="sure_btn" @click="updatedPw">{{btnText}}</a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import {updatedPassword} from '~/libs/api';
    export default {
        data(){
            return {
                params:{},
                btnText: '确定',
                verification: {}
            }
        },
        methods:{
            updatedPw(){
                if(this.btnText != '确定') return;
                if(!this.params.original_pass){
                    this.$message.error('请输入当前登录密码');
                    this.verification = {original_pass: true};
                    return
                }else if(!this.params.new_pass){
                    this.$message.error('请输入新密码');
                    this.verification = {new_pass: true};
                    return
                }else if(!this.params.repeat_pass){
                    this.$message.error('请再次输入您的新密码');
                    this.verification = {repeat_pass: true};
                    return
                }else if(this.params.new_pass != this.params.repeat_pass){
                    this.$message.error('两次输入的密码不一致');
                    this.verification = {repeat_pass: true};
                    return
                }
                this.verification = {};
                this.btnText = '提交中...';
                updatedPassword(this.params).then(res => {
                    this.btnText = '确定';
                    if(res.code == 200){
                        this.$message.success({
                            message: res.message,
                            duration: 1000,
                            onClose: () => {
                                this.$store.commit('loginOut', 'login');
                            }
                        })
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
</script>
