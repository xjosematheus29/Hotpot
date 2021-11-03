class ServiceAPIClass{getDefaultLanguage(){return this.DefaultLanguageCode_;}
getBatchMaxElements(){return this.BatchMaxElements_;}
getBatchMaxCharacters(){return this.BatchMaxCharacters_;}
getLanguageList(tagParam){let tag=tagParam?tagParam.toLowerCase():'all';let list=this.LanguageList_;if(tag==='popular'){list=this.LanguageList_.filter(x=>this.PopularList_.includes(x[1]));}
list=list.map(x=>x[1]);return list;}
getDisplayName(languageCode){let name='Error';let languageData=this.LanguageList_.filter(x=>x[1]===languageCode);if(languageData.length){name=languageData[0][0];}else{debugError('Error finding display name for lanuage code: '+languageCode);}
return name;}
requestDidSucceed(promise,translatedList,languageCode){let successData={translatedList:translatedList,languageCode:languageCode,};promise.resolve(successData);}
errorDidOccur(promise,result,languageCode){let code=null;let message=null;if(result&&result.responseJSON&&result.responseJSON.error){let rawData=result.responseJSON.error;code=rawData.code;message=rawData.message;}
let errorData={statusCode:code,statusMessage:message,languageCode:languageCode,};promise.reject(errorData);}
getErrorResponse(code,message){return{responseJSON:{error:{code:code||500,message:message,}}}}}
class MicrosoftClass extends ServiceAPIClass{constructor(){super();this.BatchMaxElements_=100;this.BatchMaxCharacters_=10000;this.DefaultLanguageCode_='zh-Hant';this.PopularList_=['ar','zh-Hans','zh-Hant','en','fr','de','hi','id','it','mr','ja','ko','pt-pt','pl','ru','es','sw','sv','th','tr','vi',];this.LanguageList_=[['Afrikaans','af'],['Arabic','ar'],['Bangla','bn'],['Bosnian','bs'],['Bulgarian','bg'],['Cantonese','yue'],['Catalan','ca'],['Chinese - S','zh-Hans'],['Chinese - T','zh-Hant'],['Croatian','hr'],['Czech','cs'],['Danish','da'],['Dutch','nl'],['English','en'],['Estonian','et'],['Fijian','fj'],['Filipino','fil'],['Finnish','fi'],['French','fr'],['German','de'],['Greek','el'],['Gujarati','gu'],['Haitian','ht'],['Hebrew','he'],['Hindi','hi'],['Hmong','mww'],['Hungarian','hu'],['Icelandic','is'],['Indonesian','id'],['Irish','ga'],['Italian','it'],['Japanese','ja'],['Kannada','kn'],['Kazakh','kk'],['Klingon','tlh-Latn'],['Korean','ko'],['Latvian','lv'],['Lithuanian','lt'],['Malagasy','mg'],['Malay','ms'],['Malayalam','ml'],['Maltese','mt'],['Maori','mi'],['Marathi','mr'],['Norwegian','nb'],['Persian','fa'],['Polish','pl'],['Portuguese - B','pt-br'],['Portuguese - P','pt-pt'],['Punjabi','pa'],['Queretaro','otq'],['Romanian','ro'],['Russian','ru'],['Samoan','sm'],['Serbian - C','sr-Cyrl'],['Serbian - L','sr-Latn'],['Slovak','sk'],['Slovenian','sl'],['Spanish','es'],['Swahili','sw'],['Swedish','sv'],['Tahitian','ty'],['Tamil','ta'],['Telugu','te'],['Thai','th'],['Tongan','to'],['Turkish','tr'],['Ukrainian','uk'],['Urdu','ur'],['Vietnamese','vi'],['Welsh','cy'],['Yucatec','yua'],];}
makeRequest(textList,languageCode){let promise=$.Deferred();let baseURL='https://api.cognitive.microsofttranslator.com/translate';let apiVersion='3.0';let key='5b912f68fd6a48839a3a68cf362f364d';let apiParams={'api-version':apiVersion};let languageCodeQueryStringParamName='to';let languageQueryString=languageCodeQueryStringParamName+'='+languageCode;let queryString=jQuery.param(apiParams)+'&'+languageQueryString;let apiURL=baseURL+'?'+queryString;let requestBody=this.getTranslationRequestBody(textList);let jsonBody=JSON.stringify(requestBody);let headers={'Ocp-Apim-Subscription-Key':key,'Content-type':'application/json',}
let settings={'url':apiURL,'method':'POST','timeout':0,'dataType':'json','contentType':'application/json','headers':headers,'data':jsonBody};let instance=this;$.ajax(settings).done(function(result){instance.requestDidSucceed(promise,result,languageCodeQueryStringParamName,languageCode);}).fail(function(result){instance.errorDidOccur(promise,result,languageCode);})
return promise;}
requestDidSucceed(promise,result,languageCodeQueryStringParamName,languageCode){if(!result||!languageCodeQueryStringParamName||!languageCode){let response=this.getErrorResponse(400,'Error: cannot parse Microsoft API result');this.errorDidOccur(promise,response,languageCode);return;}
let translatedList=result.map(x=>x.translations[0].text);super.requestDidSucceed(promise,translatedList,languageCode);}
getTranslationRequestBody(textList){let requestBody=textList.map(function(x){return{"Text":x};});return requestBody;}}
class GoogleClass extends ServiceAPIClass{constructor(){super();this.BatchMaxElements_=100;this.BatchMaxCharacters_=10000;this.DefaultLanguageCode_='zh-TW';this.PopularList_=['ar','zh-CN','zh-TW','en','fr','de','hi','id','it','mr','ja','ko','pt','pl','ru','es','sw','sv','th','tr','vi',];this.LanguageList_=[['Afrikaans','af'],['Albanian','sq'],['Amharic','am'],['Arabic','ar'],['Armenian','hy'],['Azerbaijani','az'],['Basque','eu'],['Belarusian','be'],['Bengali','bn'],['Bosnian','bs'],['Bulgarian','bg'],['Catalan','ca'],['Cebuano','ceb'],['Chichewa','ny'],['Chinese - S','zh-CN'],['Chinese - T','zh-TW'],['Corsican','co'],['Croatian','hr'],['Czech','cs'],['Danish','da'],['Dutch','nl'],['English','en'],['Esperanto','eo'],['Estonian','et'],['Filipino','tl'],['Finnish','fi'],['French','fr'],['Frisian','fy'],['Galician','gl'],['Georgian','ka'],['German','de'],['Greek','el'],['Gujarati','gu'],['Haitian','ht'],['Hausa','ha'],['Hawaiian','haw'],['Hebrew','iw'],['Hindi','hi'],['Hmong','hmn'],['Hungarian','hu'],['Icelandic','is'],['Igbo','ig'],['Indonesian','id'],['Irish','ga'],['Italian','it'],['Japanese','ja'],['Javanese','jw'],['Kannada','kn'],['Kazakh','kk'],['Khmer','km'],['Kinyarwanda','rw'],['Korean','ko'],['Kurdish','ku'],['Kyrgyz','ky'],['Lao','lo'],['Latin','la'],['Latvian','lv'],['Lithuanian','lt'],['Luxembourgish','lb'],['Macedonian','mk'],['Malagasy','mg'],['Malay','ms'],['Malayalam','ml'],['Maltese','mt'],['Maori','mi'],['Marathi','mr'],['Mongolian','mn'],['Myanmar','my'],['Nepali','ne'],['Norwegian','no'],['Odia','or'],['Pashto','ps'],['Persian','fa'],['Polish','pl'],['Portuguese','pt'],['Punjabi','pa'],['Romanian','ro'],['Russian','ru'],['Samoan','sm'],['Scots','gd'],['Serbian','sr'],['Sesotho','st'],['Shona','sn'],['Sindhi','sd'],['Sinhala','si'],['Slovak','sk'],['Slovenian','sl'],['Somali','so'],['Spanish','es'],['Sundanese','su'],['Swahili','sw'],['Swedish','sv'],['Tajik','tg'],['Tamil','ta'],['Tatar','tt'],['Telugu','te'],['Thai','th'],['Turkish','tr'],['Turkmen','tk'],['Ukrainian','uk'],['Urdu','ur'],['Uyghur','ug'],['Uzbek','uz'],['Vietnamese','vi'],['Welsh','cy'],['Xhosa','xh'],['Yiddish','yi'],['Yoruba','yo'],['Zulu','zu'],];}
makeRequest(textList,languageCode){let promise=$.Deferred();let baseURL='https://translation.googleapis.com/language/translate/v2';let key='AIzaSyD-msGoGwT1xeqX9r4_ux8KoSGOKNzSdRo';let apiURL=baseURL+'?key='+key;let apiParams={'q':textList,'target':languageCode};let jsonBody=JSON.stringify(apiParams);let headers={'Content-type':'application/json',}
let settings={'url':apiURL,'method':'POST','timeout':0,'dataType':'json','contentType':'application/json','headers':headers,'data':jsonBody};let instance=this;$.ajax(settings).done(function(result){instance.requestDidSucceed(promise,result,languageCode);}).fail(function(result){instance.errorDidOccur(promise,result,languageCode);})
return promise;}
requestDidSucceed(promise,result,languageCode){if(!result||!result.data||!result.data.translations){let response=this.getErrorResponse(400,'Cannot parse Google translation result');this.errorDidOccur(promise,response,languageCode);return;}
let apiTranslations=result.data.translations;let translatedList=apiTranslations.map(x=>x.translatedText);super.requestDidSucceed(promise,translatedList,languageCode);}}
class TranslatorClass{constructor(){this.serviceAPI_=new MicrosoftClass();}
setServiceAPI(serviceEnum){this.serviceAPI_=new MicrosoftClass();}
getDefaultLanguage(){return this.serviceAPI_.getDefaultLanguage();}
getLanguageList(tagParam){return this.serviceAPI_.getLanguageList(tagParam);}
getDisplayName(languageCode){return this.serviceAPI_.getDisplayName(languageCode);}
translate(textList,languageCode){let promise=$.Deferred();let bm=new BatchManagerClass();let instance=this;bm.translate(this.serviceAPI_,textList,languageCode).then(translatedList=>this.translateDidSucceed(promise,translatedList,languageCode)).catch(errorResult=>this.translateDidFail(promise,errorResult,languageCode));return promise;}
translateDidSucceed(promise,translatedList,languageCode){let successData={translatedList:translatedList,languageCode:languageCode,}
promise.resolve(successData);}
translateDidFail(promise,errorResult,languageCode){errorResult.languageCode=languageCode;promise.reject(errorResult);}}
class BatchManagerClass{constructor(){this.SuccessCode_=200;this.ErrorCode_=-1;this.statusCode_=null;this.batchList_={};}
translate(serviceApi,textList,languageCode){let promise=$.Deferred();let batchList=this.getBatchList(serviceApi,textList);for(const batch of batchList){let batchID=this.createBatchID();this.batchList_[batchID]=null;let instance=this;serviceApi.makeRequest(batch,languageCode).then(successResult=>instance.batchDidSucceed(promise,batchID,successResult)).catch(errorResult=>instance.batchDidFail(promise,errorResult));}
return promise;}
getBatchList(serviceApi,textList){let batchList=[];let maxElements=serviceApi.getBatchMaxElements();let maxCharacters=serviceApi.getBatchMaxCharacters();let curBatch=[];let batchElements=0;let batchCharacters=0;for(const textElement of textList){if(batchCharacters+textElement.length>maxCharacters||batchElements+1>maxElements){batchList.push(curBatch);curBatch=[];batchElements=0;batchCharacters=0;}
curBatch.push(textElement);batchCharacters+=textElement.length;batchElements+=1;}
if(batchElements>0){batchList.push(curBatch);}
return batchList;}
createBatchID(){let prefixLength=2;let suffixLength=5;let id='H'+createNumberString(prefixLength)+createAlphanumericString(suffixLength);return id;}
batchDidSucceed(promise,batchID,result){let translatedList=result.translatedList;this.updateBatchList(batchID,translatedList);if(this.statusCode_===this.SuccessCode_){let mergedList=this.mergeBatchList();promise.resolve(mergedList);}}
mergeBatchList(){let resultList=Object.values(this.batchList_);return flattenArray(resultList);}
updateBatchList(batchID,translatedTextList){let keyList=Object.keys(this.batchList_);if(keyList.indexOf(batchID)===-1){debugError('Batch not found. Batch ID: '+batchID);return;}
this.batchList_[batchID]=translatedTextList;if(this.didBatchListSucceed()){this.statusCode_=this.SuccessCode_;}}
didBatchListSucceed(){let numNullBatches=Object.values(this.batchList_).filter(x=>!x).length;return numNullBatches===0;}
batchDidFail(promise,errorResult){if(!this.statusCode_||this.statusCode_===this.SuccessCode_){this.statusCode_=this.ErrorCode_;promise.reject(errorResult);}}};