var Hotpot=(function(){var isLogging=true;const itemTypes={design:0,text:1,graphic:2,};const graphicEventTypes={changeBackground:0,changeForeground:1,changeFrame:2,changeScreenshot:3,createGraphic:4,createDevice:5,changeMask:6,createCallOut:7,createDivider:8,createPattern:9,createLogo:10,};const sizeEventTypes={changeWidth:0,changeHeight:1,};const colorEventTypes={changeBackground:0,changeText:1,changeBackgroundGraphic:2,changeForegroundGraphic:3,changeFrameGraphic:4,changeIconFill:5,changeIconStroke:6,changeIconBackgroundFill:7,changeIconBackgroundStroke:8};const eventTypes={graphic:graphicEventTypes,color:colorEventTypes,size:sizeEventTypes};var newPadding=function(top,right,bottom,left){return{top:top,right:right,bottom:bottom,left:left};}
var newGraphic=function(url,naturalWidth,naturalHeight){return{url:url,naturalWidth:naturalWidth,naturalHeight:naturalHeight,aspectRatio:naturalWidth/naturalHeight};}
var getItemType=function(item){var itemType=null;if(!item){return itemType;}
if(item.attr("id")=="designBox"){itemType=Hotpot.itemTypes.design;}else if(item.hasClass("itemBox text")){itemType=Hotpot.itemTypes.text;}else if(item.hasClass("itemBox graphic")){itemType=Hotpot.itemTypes.graphic;}
return itemType;}
var isItemBox=function(item){return!item?false:item.hasClass("itemBox");}
var isDesign=function(item){return getItemType(item)==Hotpot.itemTypes.design;}
var isText=function(item){return getItemType(item)==Hotpot.itemTypes.text;}
var isGraphic=function(item){return getItemType(item)==Hotpot.itemTypes.graphic;}
return{isLogging:isLogging,itemTypes:itemTypes,eventTypes:eventTypes,newPadding:newPadding,newGraphic:newGraphic,getItemType:getItemType,isDesign:isDesign,isItemBox:isItemBox,isText:isText,isGraphic:isGraphic,};})();function createAlphanumericString(length){return createRandomString("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",length);}
function createNumberString(length){return createRandomString("0123456789",length);}
function createRandomString(characterString,length){var text="";for(var i=0;i<length;i++){text+=characterString.charAt(Math.floor(Math.random()*characterString.length));}
return text;}
function isDefined(value){return typeof value!=="undefined"&&value!==null;}
function isBlank(s){return!isDefined(s)||s.trim()===""}
function isInteger(value){return!isNaN(value)&&parseInt(Number(value))==value&&!isNaN(parseInt(value,10));}
function roundToStep(value,stepParam){let step=stepParam||1.0;let inv=1.0/step;return Math.round(value*inv)/inv;}
function getImageSize(imageURL,callback){var svgDoc=dataURLToSVGDoc(imageURL);if(svgDoc){var viewBox=$(svgDoc).find("svg").prop("viewBox").baseVal;if(!viewBox){debugError("Error getting image size: SVG without viewBox. Image URL: "+imageURL);if(callback){callback(null,null);}}else{callback(viewBox.width,viewBox.height);}}else{var image=new Image();image.onload=function(){if(!callback){debugError("Error getting image size: no callback. Image URL: "+imageURL);}else{callback(this.naturalWidth,this.naturalHeight);}}
image.src=imageURL;}}
function getImageSizePROMISE(imageUrl){let promise=$.Deferred();let image=new Image();image.onload=function(){let width=this.naturalWidth;let height=this.naturalHeight;let svgSize=getSvgImageSize(imageUrl);if(svgSize.width&&svgSize.height){width=svgSize.width;height=svgSize.height;}
promise.resolve({image:image,width:width,height:height,});}
image.src=imageUrl;return promise;}
function getSvgImageSize(dataUrl){let width=0;let height=0;let svgDoc=dataURLToSVGDoc(dataUrl);if(svgDoc){let viewBox=$(svgDoc).find('svg').prop('viewBox').baseVal;if(!viewBox){debug('Found SVG image without viewBox');}else{width=viewBox.width;height=viewBox.height;}}
return{width:width,height:height}}
function sizeIframeToContent(item){var iframe=item.closest("iframe");if(iframe.length==0){debugError("Error sizing iframe to content: no iframe found for "+printName(item));return;}
var docBody=$(iframe[0].contentWindow.document.body);var width=docBody[0].scrollWidth;var height=docBody.height();var top=iframe.offset().top;var maxHeight=$(window).height()-top;if(height>maxHeight){height=maxHeight;}
iframe.width(width);if(height==maxHeight){iframe.outerHeight(height);}else{iframe.height(height);}}
function graphicURLToDataURL(graphicURL,callback){let xhr=new XMLHttpRequest();xhr.onload=function(){let reader=new FileReader();reader.onloadend=function(){callback(reader.result);}
reader.readAsDataURL(xhr.response);};xhr.open('GET',graphicURL);xhr.responseType='blob';xhr.send();}
function isScrolledIntoView(elem){var docViewTop=$(window).scrollTop();var docViewBottom=docViewTop+$(window).height();var elemTop=$(elem).offset().top;var elemBottom=elemTop+$(elem).height();return((elemBottom<=docViewBottom)&&(elemTop>=docViewTop));}
function isValidEmail(email){let re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return re.test(email);}
function isValidWebUrl(url){let regEx=/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;return regEx.test(url);}
function flattenArray(arr,result=[]){for(let i=0,length=arr.length;i<length;i++){const value=arr[i];if(Array.isArray(value)){flattenArray(value,result);}else{result.push(value);}}
return result;}
function scrubArray(originalArray){let uniqueArray=Array.from(new Set(originalArray));let cleanArray=uniqueArray.filter(x=>x);return cleanArray;}
function delayCode(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
function parseFilename(filename){let baseName=filename;let extension='';if(filename){let splitFilename=filename.split('.');if(splitFilename.length>1){extension=splitFilename.pop();baseName=splitFilename.join('.');}}
return{baseName:baseName,extension:extension,}}
function downloadTextFile(filename,content){let aTag=document.createElement('a');let file=new Blob([content],{type:'text/plain'});aTag.href=URL.createObjectURL(file);aTag.download=filename;aTag.click();aTag.remove();}
function downloadImageFile(filename,dataUrl){let aTag=document.createElement('a');aTag.href=dataUrl;aTag.download=filename;aTag.click();aTag.remove();}
function debug(output){if(Hotpot.isLogging){console.log(output+".");}}
function debugError(output){if(Hotpot.isLogging){console.log("@@@ "+output+".");}}
function debugObserveCSS(el,property){var MutationObserver=window.WebKitMutationObserver;var observer=new MutationObserver(function(mutations){mutations.forEach(function(mutation){console.log('old',mutation.oldValue,'new',mutation.target.style.cssText,'mutation',mutation);if(mutation.attributeName==property)debugger;});});var config={attributes:true,attributeOldValue:true}
observer.observe(el,config);}
function printName(item){if(item){return item.attr("id")||item.attr("class")||item.prop("tagName");}else{return "undefined";}}
function logEvent(category,action,label){gtag('event',action,{event_category:category,event_label:label});}
function logPayment(orderData){let orderAmount=Math.round(orderData.orderAmount/100);let transactionId=orderData.transactionId;let affiliation='Hotpot.ai';fbq('track','Purchase',{currency:'USD',value:orderAmount});gtag('event','purchase',{transaction_id:transactionId,affiliation:affiliation,value:orderAmount,currency:'USD',tax:0,shipping:0,items:[]});gtag('event','conversion',{send_to:'AW-770971492/dQFZCJu3x84BEOSu0O8C',value:orderAmount,currency:'USD',});}
function didPressMetaKey1(event){return navigator.platform.includes("Mac")&&event.metaKey||event.ctrlKey;}
function didPressMetaKey2(event){return event.altKey;}
function valuesToFontObject(family,weight,style){const fontWeights={100:"Thin",200:"Extra-light",300:"Light",400:"Regular",500:"Medium",600:"Semi-bold",700:"Bold",800:"Extra-bold",900:"Black"};var parts=[family];if(weight!="400")parts.push(fontWeights[weight]);if(style!=="normal")parts.push(style);return{family,style,weight:parseInt(weight,10),fullName:parts.join(" ")};}
function unitStringToInt(unitString,unit){if(unitString){return parseInt(unitString.replace(unit,""));}else{return null;}}
function pixelStringToInt(pixelString){if(pixelString){return parseInt(pixelString.replace(/px/g,''));}else{return null;}}
function compoundPixelStringToIntArray(compoundString){var stringArray=compoundString?compoundString.split(/\s/):[];var pixelArray=stringArray.map(x=>pixelStringToInt(x));return pixelArray;}
function pixelStringToFloat(pixelString){if(pixelString){return parseFloat(pixelString.replace(/px/g,""));}else{return null;}}
function percentageStringToInt(percentageString){if(percentageString){return parseInt(percentageString.replace(/%/g,""));}else{return null;}}
function pixelStringToRoundedDecimal(pixelString,denominator){if(!pixelString){return null;}else{var pixelInt=parseInt(pixelString.replace(/px/g,""));return Math.round(pixelInt*100/denominator)/100;}}
function decimalToPercentageString(decimal){return(Math.round(decimal*100)+"%");}
function cssURLToURL(cssURL){var url=null;var regEx=/\((.*?)\)/;if(cssURL){var match=regEx.exec(cssURL);if(match){url=match[1].replace(/('|")/g,'');}}
return url;}
function toCamelCase(s){return s.replace(/_/g," ").replace(/\s(.)/g,function($1){return $1.toUpperCase();}).replace(/\s/g,"").replace(/^(.)/,function($1){return $1.toLowerCase();});}
function camelCaseToWords(camelCaseWord){return camelCaseWord.replace(/([A-Z])/g,' $1').replace(/^./,function(str){return str.toUpperCase();});}
function splitScrubString(string,regEx){var splitList=string.split(regEx);splitList=splitList.map(x=>x.trim());splitList=splitList.filter(x=>x);return splitList;}
function hasExtension(string,extensionList){if(!string||!extensionList||!extensionList.length){return false;}else{var lowerCaseString=string.toLowerCase();var matches=extensionList.filter(x=>lowerCaseString.endsWith(x.toLowerCase()));return matches.length>0;}}
function backgroundSizeToInts(element){let width=null;let height=null;if(element){let sizeString=element.css('background-size');if(sizeString){let splitString=sizeString.split(/\s/);if(splitString.length>0){let unit='px';if(splitString[0].endsWith(unit)){width=pixelStringToInt(splitString[0]);if(splitString.length==2){if(splitString[1].endsWith(unit)){height=pixelStringToInt(splitString[1]);}else{height=width;}}}}}}
return{width:width,height:height,}}
function getURLParameter(sParam){let sPageURL=window.location.search.substring(1),sURLVariables=sPageURL.split('&'),sParameterName,i;for(i=0;i<sURLVariables.length;i++){sParameterName=sURLVariables[i].split('=');if(sParameterName[0]===sParam){return sParameterName[1]===undefined?true:decodeURIComponent(sParameterName[1]);}}}
function getURLPath(url){return url?url.split(/[?#]/)[0]:"";}
function getURLMinusProtocol(url){return url?url.replace(/^https?\:\/\//i,""):"";}
function setQueryString(key,value,url){if(!url)url=window.location.href;let updated='';var re=new RegExp("([?&])"+key+"=.*?(&|#|$)(.*)","gi"),hash;if(re.test(url)){if(typeof value!=='undefined'&&value!==null){updated=url.replace(re,'$1'+key+"="+value+'$2$3');}
else{hash=url.split('#');url=hash[0].replace(re,'$1$3').replace(/(&|\?)$/,'');if(typeof hash[1]!=='undefined'&&hash[1]!==null){url+='#'+hash[1];}
updated=url;}}
else{if(typeof value!=='undefined'&&value!==null){var separator=url.indexOf('?')!==-1?'&':'?';hash=url.split('#');url=hash[0]+separator+key+'='+value;if(typeof hash[1]!=='undefined'&&hash[1]!==null){url+='#'+hash[1];}
updated=url;}
else{updated=url;}}
window.history.replaceState({path:updated},'',updated);}
function dataURLToBase64Image(dataURL){if(!dataURL){return null;}else{let base64String=dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/,"");return base64String;}}
function base64ImageToDataUrl(base64Image,formatParam){let format=formatParam.toLowerCase();let dataUrl='data:image/'+format+';base64,'+base64Image;return dataUrl;}
async function dataUrlToFile(dataUrl,filename){let commaIndex=dataUrl.indexOf(',');let preDataString=dataUrl.slice(0,commaIndex);let fileType='image/png';if(preDataString.match(/image\/jpeg|image\/jpg/)){fileType='image/jpeg';}
let file=await urlToFile(dataUrl,filename,fileType);return file;}
async function urlToImageFile(url,filename){let fileType='image/png';if(filename.endsWith('.jpg')){fileType='image/jpeg'}
const response=await fetch(url);const blob=await response.blob();return new File([blob],filename,{type:fileType});}
async function urlToFile(url,filename,fileType){const response=await fetch(url);const blob=await response.blob();return new File([blob],filename,{type:fileType});}
function replaceFileList(fileListElement,file){let dataTransferFileList=new DataTransfer();dataTransferFileList.items.add(file);fileListElement[0].files=dataTransferFileList.files;}
function dataURLToSVGDoc(dataURI){let svgDoc=null;let svgURIRegEx=/data:image\/svg\+xml;(base64|charset=utf8),(.*)/;let uriMatch=svgURIRegEx.exec(dataURI);if(uriMatch){let svgStr='';if(uriMatch[1]==='base64'){svgStr=atob(uriMatch[2]);}else{svgStr=decodeURI(uriMatch[2]);}
let parser=new DOMParser();svgDoc=parser.parseFromString(svgStr,'image/svg+xml');}
return svgDoc;}
function svgDocToDataURL(svgDoc,base64){const svgPrefix="data:image/svg+xml;";var svgData=new XMLSerializer().serializeToString(svgDoc);if(base64){var base64Data=btoa(svgData);return svgPrefix+"base64,"+base64Data;}else{var urlData=encodeURIComponent(svgData);return svgPrefix+"charset=utf8,"+urlData;}}
function didFindUnsupportedBrowser(isMobile){var fallbackURL="/unsupported";if(isMobile){fallbackURL+="?mobile=1";}
var locationURL=window.location.protocol+"//"+window.location.host+fallbackURL;window.location=locationURL;}
function isRetinaDevice(){return window.devicePixelRatio>1;}
function onIframeReady($i,successFn,errorFn){try{const iCon=$i.first()[0].contentWindow,bl="about:blank",compl="complete";const callCallback=()=>{try{const $con=$i.contents();if($con.length===0){throw new Error("iframe inaccessible");}
successFn($con);}catch(e){errorFn();}};const observeOnload=()=>{$i.on("load.jqueryMark",()=>{try{const src=$i.attr("src").trim(),href=iCon.location.href;if(href!==bl||src===bl||src===""){$i.off("load.jqueryMark");callCallback();}}catch(e){errorFn();}});};if(iCon.document.readyState===compl){const src=$i.attr("src").trim(),href=iCon.location.href;if(href===bl&&src!==bl&&src!==""){observeOnload();}else{callCallback();}}else{observeOnload();}}catch(e){errorFn();}}
function getRadioButtonValue(radioButtonName){return $("input[type='radio'][name='"+radioButtonName+"']:checked").val();}
function downloadFromImageBox(imageBox){let dataUrl=imageBox.find('img').attr('src');let extension='png';let filename='Hotpot'+'.'+extension;downloadImageFile(filename,dataUrl);}
function didDropEvent(e,callback){e.preventDefault();var file=null;if(e.dataTransfer.items){if(e.dataTransfer.items.length){var firstItem=e.dataTransfer.items[0];if(firstItem.kind==='file'){file=firstItem.getAsFile();}}}else{if(e.dataTransfer.files.length){file=e.dataTransfer.files[0];}}
if(file){callback(file);}}
function getFileFromDropEvent(event){event.preventDefault();let file=null;if(event.dataTransfer.items){if(event.dataTransfer.items.length){let firstItem=event.dataTransfer.items[0];if(firstItem.kind==='file'){file=firstItem.getAsFile();}}}else{if(event.dataTransfer.files.length){file=event.dataTransfer.files[0];}}
return file;}
function didDragOverEvent(e){e.preventDefault();}
var ClipboardClass=(function(){function getImageFile(){let items=getClipboardItems();let blob=null;for(let i=0;i<items.length;i++){if(items[i].type.indexOf('image')===0){blob=items[i].getAsFile();}}
return blob;}
function getText(textType,callback){let itemList=getClipboardItems();let text=null;for(const item of itemList){if(item.type.indexOf(textType)===0){item.getAsString(function(string){callback(string);});}}}
function copyText(text){var tempElem=$('<textarea style="position: absolute; top: -8888px; left: -8888px">');$("body").append(tempElem);tempElem.val(text).select();document.execCommand("copy");tempElem.remove();}
function getClipboardItems(){return(event.clipboardData||event.originalEvent.clipboardData).items;}
return{copyText:copyText,getImageFile:getImageFile,getText:getText,};})();var MessageClass=(function(){"use strict";const DefaultShowDur=7000;const DefaultSliderDur=250;var ListBox=null;var ModalBox=null;function showModalString(messageString){var stringList=messageString.split("\n");var messageHTML=stringList.map(x=>"<p> "+x+"</p>").join("");showModal(messageHTML);}
function showModal(messageHTML){if(!messageHTML){return;}
if(!ModalBox){ModalBox=createModalBox();}
ModalBox.find(".modalContent").html(messageHTML);var fadeDur=200;ModalBox.fadeIn(fadeDur);}
function showMessage(message,dur){var showDur=dur?dur:DefaultShowDur;if(!message){return;}
if(!ListBox){ListBox=createListBox();}
var messageBox=createMessageBox(message);messageBox.hide();ListBox.prepend(messageBox);messageBox.slideDown(DefaultSliderDur);var timer=setTimeout(function(){removeMessageBox(messageBox);},showDur);messageBox.data("timer",timer);}
function hideAll(){if(ListBox){ListBox.empty();}}
function createModalBox(){var modalElement=$(document.createElement("div"));var overlayElement=$(document.createElement("div"));var contentElement=$(document.createElement("div"));var id="messageClassModalBox";modalElement.attr("id",id);overlayElement.addClass("modalOverlay");contentElement.addClass("modalContent");modalElement.append(overlayElement);modalElement.append(contentElement);overlayElement.on("click",function(){hideModalBox();});$("body").append(modalElement);return modalElement;}
function hideModalBox(){if(ModalBox){ModalBox.remove();ModalBox=null;}}
function createListBox(){var element=$(document.createElement("div"));var id="messageClassListBox";element.attr("id",id);$("body").append(element);return element;}
function createMessageBox(message){var boxElement=$(document.createElement("div"));boxElement.addClass("messageBox disabledSelect");var messageElement=$(document.createElement("div"));messageElement.addClass("message");messageElement.text(message);boxElement.append(messageElement);boxElement[0].onclick=function(){didClickMessageBox($(this));}
return boxElement;}
function didClickMessageBox(messageBox){removeMessageBox(messageBox);}
function removeMessageBox(messageBox){var timer=messageBox.data("timer");clearTimeout(timer);messageBox.slideUp(DefaultSliderDur,function(){messageBox.remove();});}
return{showMessage:showMessage,showModal:showModal,showModalString:showModalString,hideAll:hideAll};})();class FormClass{static getRadioButtonValue(name){let selector=`input[type='radio'][name='${name}']`;let checkedValue=$(selector+':checked').val();return checkedValue?checkedValue:$(selector).eq(0).val();}
static getImageDataFromFileElement(fileElement){let promise=$.Deferred();if(!fileElement[0].files.length){promise.reject();return promise;}
let firstFile=fileElement[0].files[0];this.getImageDataFromFile(firstFile).then(imageData=>promise.resolve(imageData)).catch(error=>promise.reject(error));return promise;}
static getImageDataFromFile(file){let promise=$.Deferred();let reader=new FileReader();reader.onload=async function(e){let dataUrl=reader.result;let imageSize=await getImageSizePROMISE(dataUrl);let imageData={filename:file.name,image:imageSize.image,dataUrl:dataUrl,size:file.size,width:imageSize.width,height:imageSize.height,}
promise.resolve(imageData);}
reader.readAsDataURL(file);return promise;}
static getTextDataFromFile(file){let promise=$.Deferred();let reader=new FileReader();reader.onload=function(e){let data={filename:file.name,text:reader.result,}
promise.resolve(data);};reader.readAsText(file);return promise;}};