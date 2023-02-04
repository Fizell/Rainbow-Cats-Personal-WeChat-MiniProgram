/* Main page of the app */
Page({
    data: {
        backgroundAudioManager: undefined,
        checked: true,
        creditA: 0,
        creditB: 0,

        userA: '',
        userB: '',
    },
    async onShow(){
        if (this.data.musicInit == false) {
            this.player(wx.getBackgroundAudioManager())
            this.data.musicInit = true
        }
        this.getCreditA()
        this.getCreditB()
        this.setData({
            userA: getApp().globalData.userA,
            userB: getApp().globalData.userB,
        })
    },
    checkMusic() {
        this.setData({
          checked: !this.data.checked
        })
        if (!this.data.checked) {
          wx.getBackgroundAudioManager().pause();
        } else {
          this.player(wx.getBackgroundAudioManager())
        }
      },
    player(e) {
        e.title = 'music~'
        e.src = "http://music.163.com/song/media/outer/url?id=139730.mp3"
        //音乐播放结束后继续播放此音乐，循环不停的播放
        e.onEnded(() => {
          this.player(wx.getBackgroundAudioManager())
        })
      },
    // // 页面卸载时候暂停播放（不加页面将一直播放）
    // onUnload: function () {
    //     wx.getBackgroundAudioManager().stop();
    // },
    // 小程序隐藏时候暂停播放（不加页面将一直播放）
    // onHide() {
    //     this.data.musicInit = false
    // },
    getCreditA(){
        wx.cloud.callFunction({name: 'getElementByOpenId', data: {list: getApp().globalData.collectionUserList, _openid: getApp().globalData._openidA}})
        .then(res => {
            console.log(res)
          this.setData({creditA: res.result.data[0].credit})
        })
    },
    
    getCreditB(){
        wx.cloud.callFunction({name: 'getElementByOpenId', data: {list: getApp().globalData.collectionUserList, _openid: getApp().globalData._openidB}})
        .then(res => {
            console.log(res)
            this.setData({creditB: res.result.data[0].credit})
        })
    },
})