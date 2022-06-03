const PROXY_CONFIG = [{
    context: ['/api'],
    target: 'https://tramita.tce.pb.gov.br/tramita/webservice/murallicitacoes',
    //target: 'http://localhost:8080',
    secure: true,
    pathRewrite: { '^/api': '' },
    changeOrigin: true
}];

module.exports = PROXY_CONFIG;