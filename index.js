var _ = require('lodash');

module.exports = {
	isValid: function(path){
		return (path.match(/^\d+(\.\d+)*$/g) || []).length > 0;
	},

	getParent: function (path) {
		var rx = /^(.+)(\.[0-9]+)$/;
		var arr = rx.exec(path);

		if(arr !== null) {
			return arr[1];
		} else {
			return '';
		}
	},

	getParents: function(path) {
		var currentPath = path;
		var currentParent = this.getParent(currentPath);
		var parents = [];

		while(currentParent) {
			parents.push(currentParent);
			currentPath = currentParent;
			currentParent = this.getParent(currentPath);
		}

		return parents;
	},

	isFather: function(parentPath, childPath) {
		return parentPath == this.getParent(childPath);
	},

	isParent: function(parentPath, childPath) {
		//Not yet implemented
		return parentPath == this.getParent(childPath);
	},

	increasePath: function(lastPath, parentPath) {
		if(lastPath) {
			var segments = lastPath.split('.');
			segments[segments.length-1] = Number(segments[segments.length-1]) + 1;
			return segments.join('.');
		} else {
			return parentPath + '.1';
		}
	},

	level: function(path){
		if(path)
			return (path.match(/\./g) || []).length + 1;
		else
			return 0;
	},

	leftPadd: function (n, p, c) {
		var pad_char = typeof c !== 'undefined' ? c : '0';
		var pad = new Array(1 + p).join(pad_char);
		return (pad + n).slice(-pad.length);
	},

	expand: function (path, level) {
		if(typeof path == 'undefined')
			return path;
		var sections = path.split('.');
		for (i = 0; i < sections.length; ++i) {
			sections[i] = this.leftPadd(sections[i], level);
		}
		return sections.join(".");
	},

	setFlag: function(flag, pos, value){
		var mask = 1 << pos;
		if(Boolean(value)) {
			flag = flag | mask;
		} else {
			flag = flag & ~mask;
		}
		return flag;
	},

	getFlag: function(flag, pos){
		var mask = 1 << pos;
		return (flag & mask) == mask;
	},
	/*
		example usage
	*/
	unflatten: function( records, pathProperty, rootPath, childrenProperty, parent, tree ) {

			pathProperty = typeof pathProperty !== 'undefined' ? pathProperty : 'path';
			childrenProperty = typeof childrenProperty !== 'undefined' ? childrenProperty : 'children';
			rootPath = typeof rootPath !== 'undefined' ? rootPath : '0';
			tree = typeof tree !== 'undefined' ? tree : [];
			if(typeof parent === 'undefined') {
				parent = {};
				parent[pathProperty] = rootPath;
			}

			var children = _.filter( records, function(child){ return module.exports.getParent(child[pathProperty]) == parent[pathProperty]; });

			if( !_.isEmpty( children )  ){
					if( parent[pathProperty] == rootPath ){
						tree = children;
					} else {
						parent[childrenProperty] = children;
						parent['loaded'] = false;
					}
					_.each( children, function( child ){ module.exports.unflatten( records, pathProperty, rootPath, childrenProperty, child ) } );
			}

			return tree;
	}
}
