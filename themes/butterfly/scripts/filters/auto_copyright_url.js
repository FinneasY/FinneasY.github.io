hexo.extend.filter.register('before_post_render', function(data) {
    // 确保站点 URL 以 '/' 结尾
    const siteUrl = hexo.config.url.endsWith('/') ? hexo.config.url : hexo.config.url + '/';
  
    // 确保文章路径为相对路径
    const postPath = data.path.startsWith('/') ? data.path : '/' + data.path;
  
    // 如果没有定义 copyright_url，则生成完整的文章 URL
    if (!data.copyright_url) {
      data.copyright_url = siteUrl + postPath;
    }
  
    return data;
  });