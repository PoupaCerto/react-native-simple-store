'use strict';
/**
 * @overview A minimalistic wrapper around React Native's AsyncStorage.
 * @license MIT
 */
var _reactNative=require('react-native');
var _lodash=require('lodash.merge');var _lodash2=_interopRequireDefault(_lodash);
var _immutable=require('immutable');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var deviceStorage={





get:function get(key){
if(!Array.isArray(key)){
return(0,_immutable.fromJS)(_reactNative.AsyncStorage.getItem(key).then(function(value){
return JSON.parse(value);
}));
}else{
return(0,_immutable.fromJS)(_reactNative.AsyncStorage.multiGet(key).then(function(values){
return values.map(function(value){
return JSON.parse(value[1]);
});
}));
}
},







save:function save(key,value){
if(!Array.isArray(key)){
return _reactNative.AsyncStorage.setItem(key,JSON.stringify(value));
}else{
var pairs=key.map(function(pair){
return[pair[0],JSON.stringify(pair[1])];
});
return _reactNative.AsyncStorage.multiSet(pairs);
}
},







update:function update(key,value){
return deviceStorage.get(key).then(function(item){
value=typeof value==='string'?value:(0,_lodash2.default)({},item,value);
return _reactNative.AsyncStorage.setItem(key,JSON.stringify(value));
});
},






delete:function _delete(key){
return _reactNative.AsyncStorage.removeItem(key);
},





keys:function keys(){
return _reactNative.AsyncStorage.getAllKeys();
}};


module.exports=deviceStorage;