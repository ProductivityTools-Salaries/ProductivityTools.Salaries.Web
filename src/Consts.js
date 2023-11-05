const dev = {
   // clientId:"devsalariesweb",
    path_base:'https://localhost:5001',
   // stsAuthority: 'https://identityserver.productivitytools.tech:8010/',
   // clientRoot:'http://localhost:3000/',
   // clientScope:'openid profile Salaries.API'
}

const prod = {
   // clientId:"prodsalariesweb",
    path_base:'https://apisalaries.productivitytools.top:8061',
   // stsAuthority: 'https://identityserver.productivitytools.tech:8010/',
  //  clientRoot:'https://salariesweb.z35.web.core.windows.net/',
   // clientScope:'openid profile Salaries.API'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;