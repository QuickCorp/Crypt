"use strict";
/* vim: set expandtab tabstop=4 shiftwidth=4: */
/**
 * @copyright 2000-2019 Jean Machuca.
 * @author  Jean Machuca <correojean@gmail.com>
 * @package QCObjects
 * @subpackage _Crypt class
 * @example
 *
 * Example (1):
 * var _string = New(_Crypt,{string:'hello world',key:'some encryption md5 key'});
 * console.log(_string._encrypt());
 *
 * console.log(_string._decrypt()); // decodes encrypted string to the source
 *
 * Example (2):
 * _Crypt.encrypt('hola mundo','12345678866');
 * _Crypt.decrypt('nqCelFSiq6Wcpw==','12345678866');
 *
 */

 Package('cl.quickcorp._Crypt',[
   Class('_Crypt',Object,{
    last_string:"",
    last_key:"",
    construct:false,
    _new_:function (o){
      var string = o['string'];
      var key = (o.hasOwnProperty('key'))?(o['key']):(null);
      this.__new__(o);
      key = (key == null)?(this.__instanceID):(key);
      this.last_key = key;
      this.last_string = string;
      this.construct = true;
    },
    _encrypt:function (){
 			var string = this.last_string;
 			var key = this.last_key;
 			var result = '';
 			var char;
 			var keychar;
 			for (var i = 0; i<string.length; i++){
 				char = string.substr(i,1);
 				keychar = key.substr( (i % key.length)-1, 1);
 				char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
 				result += char;
 			}
 			this.last_string = btoa(result);
 			return this.last_string;
 		},
    _decrypt:function (){
 			var string = this.last_string;
 			var key = this.last_key;
 			var result = '';
 			var char;
 			var keychar;
 			string = atob(string);
 			for (var i = 0; i<string.length; i++){
 				char = string.substr(i,1);
 				keychar = key.substr( (i % key.length)-1, 1);
 				char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
 				result += char;
 			}

 			this.last_string = result;
 			return this.last_string;
 		},
    encrypt: function (string,key){
      var crypt = New(_Crypt,{
          string:string,
          key:key
        });
 			return crypt._encrypt();
    },
    decrypt: function (string,key){
      var crypt = New(_Crypt,{
          string:string,
          key:key
        });
 			return crypt._decrypt();
    }
   })
 ]);
