var botui = new BotUI('kc-botui-app');

botui.message.add({
  delay: 500,
  photo: '/img/theme_img.png',
  loading: true,
  content: '哇哦，我终于等到你。'
}).then(function () {
  return botui.message.add({
    delay: 100,
    photo: '/img/GitHub_logo.png',
    content: '首先，请选择一种语言。'
  });
}).then(function () {
  return botui.message.add({
    delay: 100,
    photo: '/img/GitHub_logo.png',
    content: 'First, please select a language.'
  });
}).then(function () {
  return botui.action.select({
    delay: 100,
    action: {
      placeholder: "Select Language",
      multipleselect: false,
      options: [
        { value: "ZH", text: "中文" },
        { value: "EN", text: "English" },
      ],
      button: {
        icon: 'check',
        label: 'OK'
      }
    }
  });
}).then(function (a) {
  "ZH" == a.value && chinese();
  "EN" == a.value && english();
});

var chinese = function () {
  botui.message.add({
    delay: 1000,
    photo: '/img/theme_img.png',
    content: "请问我要怎么称呼您呢？"
  }).then(function () {
    return botui.action.text({
      delay: 100,
      action: {
        placeholder: '在此输入...'
      }
    });
  }).then(function (res) {
    return botui.message.bot({
      delay: 1000,
      loading: true,
      photo: '/img/theme_img.png',
      content: '好极了，' + res.value
    });
  }).then(function () {
    return botui.message.add({
      delay: 1400,
      loading: true,
      photo: '/img/theme_img.png',
      content: '你想先了解哪方面的内容呢？'
    });
  }).then(function () {
    return botui.action.button({
      delay: 500,
      action: [{
        text: '关于我',
        value: 'chooseMe'
      }, {
        text: '关于主题',
        value: 'chooseTheme'
      }, {
        text: '我不想了解这些 😒',
        value: 'skip'
      }]
    });
  }).then(function (b) {
    "chooseMe" == b.value && aboutMe_zh();
    "chooseTheme" == b.value && aboutTheme_zh();
    "skip" == b.value && end_zh();
  });

  var aboutMe_zh = function () {
    botui.message.add({
      delay: 1200,
      type: 'embed',
      content: 'https://giphy.com/embed/RJz880umeI8e3PXnzt'
    }).then(function () {
      return botui.message.add({
        delay: 900,
        loading: true,
        photo: '/img/theme_img.png',
        content: '我就是K.C.'
      });
    }).then(function () {
      return botui.message.add({
        delay: 1000,
        loading: true,
        photo: '/img/theme_img.png',
        content: '这是我搭建的博客网站'
      });
    }).then(function () {
      return botui.message.add({
        delay: 800,
        loading: true,
        photo: '/img/theme_img.png',
        content: '目前就读于UM'
      });
    }).then(function () {
      return botui.message.add({
        delay: 1300,
        loading: true,
        photo: '/img/theme_img.png',
        content: '向往CS，却误入应用数学专业🙃'
      });
    }).then(function () {
      return botui.action.button({
        delay: 500,
        action: [{
          text: '关于主题',
          value: 'chooseTheme'
        }, {
          text: '我不感兴趣 😒',
          value: 'skip'
        }]
      });
    }).then(function (b) {
      "chooseTheme" == b.value && aboutTheme_zh();
      "skip" == b.value && end_zh();
    });
  };

  var aboutTheme_zh = function () {
    botui.message.add({
      delay: 1000,
      loading: true,
      photo: '/img/theme_img.png',
      content: '这是基于Hexo博客框架搭建的'
    }).then(function () {
      return botui.message.add({
        delay: 800,
        loading: true,
        photo: '/img/theme_img.png',
        content: '使用的主题是我自己制作的'
      });
    }).then(function () {
      return botui.message.add({
        delay: 1200,
        loading: true,
        photo: '/img/theme_img.png',
        content: '如果你也想搭建像我这样的一个博客网站，可以参考这篇教程'
      });
    }).then(function () {
      return botui.message.add({
        delay: 100,
        content: 'https://hikc.net/posts/1aed845/'
      });
    }).then(end_zh);
  };

  var end_zh = function () {
    botui.message.add({
      delay: 1000,
      loading: true,
      photo: '/img/theme_img.png',
      content: '好了，你还想知道什么呢？'
    }).then(function () {
      return botui.action.text({
        delay: 800,
        action: {
          //value: 'John Doe',
          placeholder: '在此输入...'
        }
      });
    }).then(function (res) {
      return botui.message.bot({
        delay: 10000,
        loading: true,
        photo: '/img/theme_img.png',
        content: '抱歉哦，关于“' + res.value + '” 没有找到这个问题的答案。你也可以 [点击此处](/about/)刷新页面。'
      });
    });
  }

};
