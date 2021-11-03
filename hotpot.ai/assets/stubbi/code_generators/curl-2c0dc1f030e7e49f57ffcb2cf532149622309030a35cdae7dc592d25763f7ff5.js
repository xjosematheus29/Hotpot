class CurlConverter{constructor(method,url,headers,bodyType,body,queryParams){this.method=method;this.url=url;this.headers=headers;this.bodyType=bodyType;this.body=body;this.queryParams=queryParams;}
generateCode(){let code='curl '
let url=this.url
if(this.queryParams&&Object.keys(this.queryParams).length!==0){url+='?'
url+=Object.keys(this.queryParams).map(key=>`${key}=${this.queryParams[key]}`).join('&');}
if(this.method!=='get'){code+=`-X ${this.method.toUpperCase()} `}
if(this.headers){for(const key of Object.keys(this.headers)){code+=`-H '${key}: ${this.headers[key]}' `;}}
if(this.body){if(this.bodyType==='x-www-form-urlencoded'){for(const key of Object.keys(this.body)){code+=`-d '${key}=${this.body[key]}' `;}}else if(this.bodyType==='form-data'){for(const key of Object.keys(this.body)){if(key.toLowerCase().includes('image')){code+=`-F '${key}=@${this.body[key]}' `
code=`\`# NOTE: replace ${this.body[key]} with full file path\` \n`+code}else{code+=`-F '${key}=${this.body[key]}' `}}}}
code+=`'${url}'`
return code}};