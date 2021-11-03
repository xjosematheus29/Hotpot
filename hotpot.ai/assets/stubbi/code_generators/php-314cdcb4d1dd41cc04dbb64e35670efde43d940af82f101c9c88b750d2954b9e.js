class PHPConverter{constructor(method,url,headers,bodyType,body,queryParams){this.method=method;this.url=url;this.headers=headers;this.bodyType=bodyType;this.body=body;this.queryParams=queryParams;}
generateCode(){let code=`<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
`
let url=this.url;if(this.queryParams&&Object.keys(this.queryParams).length!==0){url+='?'
url+=Object.keys(this.queryParams).map(key=>`${key}=${this.queryParams[key]}`).join('&');}
code+=`curl_setopt($ch, CURLOPT_URL, '${url}'); \n`
if(this.method==='post'){code+="curl_setopt($ch, CURLOPT_POST, 1);\n\n"}else if(this.method!=='get'){code+=`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, '${this.method.toUpperCase()}'); \n\n`}
if(this.headers&&Object.keys(this.headers).length!==0){code+='$headers = array(); \n'
Object.keys(this.headers).forEach((key)=>{code+=`$headers[] = '${key}: ${this.headers[key]}'; \n`});code+='curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); \n\n'}
if(this.body){if(this.bodyType==='x-www-form-urlencoded'){const postfields=Object.keys(this.body).map(key=>`${key}=${this.body[key]}`).join('&');code+=`curl_setopt($ch, CURLOPT_POSTFIELDS, '${postfields}'); \n`}else if(this.bodyType==='form-data'){code+='$postfields = array(); \n'
for(const key of Object.keys(this.body)){if(key.toLowerCase().includes('image')){code+=`$postfields['${key}'] = new CurlFile('${this.body[key]}'); \n`}else{code+=`$postfields['${key}'] = '${this.body[key]}'; \n`}}
code+=`curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields); \n\n`}}
code+=`$response = curl_exec($ch); \n`
code+=`curl_close($ch);`
return code}};