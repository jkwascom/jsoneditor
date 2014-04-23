jQuery.each(["put", "delete"], function(i, method) {
    jQuery[method] = function(url, data, callback, type) {
        if (jQuery.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
        });
    };
});

function DocumentsCloudRepository() {
    this.baseUrl = 'http://local.api.jsoneditor.com';
}

DocumentsCloudRepository.prototype.add = function(doc) {
    var deferred = when.defer();
    $.post(this.baseUrl + '/api/documents', doc, function(documentId) {
        doc.Id = documentId;
        deferred.resolve(doc);
    });
    return deferred.promise;
}

DocumentsCloudRepository.prototype.update = function(doc) {
    var deferred = when.defer();
    $.put(this.baseUrl + '/api/documents/' + doc.Id, doc, function() {
        deferred.resolve();
    });
    return deferred.promise;
}

DocumentsCloudRepository.prototype.get = function(documentId) {
    var deferred = when.defer();
    $.get(this.baseUrl + '/api/documents/' + documentId, function(doc) {
        deferred.resolve(doc);
    });
    return deferred.promise;
}

DocumentsCloudRepository.prototype.delete = function(documentId) {
    var deferred = when.defer();
    $.delete(this.baseUrl + '/api/documents/' + documentId, function() {
        deferred.resolve();
    });
    return deferred.promise;
}

DocumentsCloudRepository.prototype.getAll = function() {
    var deferred = when.defer();
    $.get(this.baseUrl + '/api/documents', function(documents) {
        deferred.resolve(documents);
    });
    return deferred.promise;
}
