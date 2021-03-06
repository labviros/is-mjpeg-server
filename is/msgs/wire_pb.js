/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');
goog.exportSymbol('proto.is.wire.ContentType', null, global);
goog.exportSymbol('proto.is.wire.Status', null, global);
goog.exportSymbol('proto.is.wire.StatusCode', null, global);
goog.exportSymbol('proto.is.wire.WireFormat', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.is.wire.Status = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.is.wire.Status, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.is.wire.Status.displayName = 'proto.is.wire.Status';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.is.wire.Status.prototype.toObject = function(opt_includeInstance) {
  return proto.is.wire.Status.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.is.wire.Status} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.is.wire.Status.toObject = function(includeInstance, msg) {
  var f, obj = {
    code: jspb.Message.getFieldWithDefault(msg, 1, 0),
    why: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.is.wire.Status}
 */
proto.is.wire.Status.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.is.wire.Status;
  return proto.is.wire.Status.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.is.wire.Status} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.is.wire.Status}
 */
proto.is.wire.Status.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.is.wire.StatusCode} */ (reader.readEnum());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setWhy(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.is.wire.Status.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.is.wire.Status.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.is.wire.Status} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.is.wire.Status.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCode();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getWhy();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional StatusCode code = 1;
 * @return {!proto.is.wire.StatusCode}
 */
proto.is.wire.Status.prototype.getCode = function() {
  return /** @type {!proto.is.wire.StatusCode} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.is.wire.StatusCode} value */
proto.is.wire.Status.prototype.setCode = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string why = 2;
 * @return {string}
 */
proto.is.wire.Status.prototype.getWhy = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.is.wire.Status.prototype.setWhy = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.is.wire.WireFormat = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.is.wire.WireFormat.oneofGroups_);
};
goog.inherits(proto.is.wire.WireFormat, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.is.wire.WireFormat.displayName = 'proto.is.wire.WireFormat';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.is.wire.WireFormat.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.is.wire.WireFormat.BodyCase = {
  BODY_NOT_SET: 0,
  RAW: 1,
  MESSAGE: 2
};

/**
 * @return {proto.is.wire.WireFormat.BodyCase}
 */
proto.is.wire.WireFormat.prototype.getBodyCase = function() {
  return /** @type {proto.is.wire.WireFormat.BodyCase} */(jspb.Message.computeOneofCase(this, proto.is.wire.WireFormat.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.is.wire.WireFormat.prototype.toObject = function(opt_includeInstance) {
  return proto.is.wire.WireFormat.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.is.wire.WireFormat} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.is.wire.WireFormat.toObject = function(includeInstance, msg) {
  var f, obj = {
    raw: msg.getRaw_asB64(),
    message: (f = msg.getMessage()) && google_protobuf_any_pb.Any.toObject(includeInstance, f),
    createdAt: jspb.Message.getFieldWithDefault(msg, 3, 0),
    contentType: jspb.Message.getFieldWithDefault(msg, 4, 0),
    status: (f = msg.getStatus()) && proto.is.wire.Status.toObject(includeInstance, f),
    correlationId: jspb.Message.getFieldWithDefault(msg, 6, 0),
    replyTo: jspb.Message.getFieldWithDefault(msg, 7, ""),
    expiresIn: jspb.Message.getFieldWithDefault(msg, 8, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.is.wire.WireFormat}
 */
proto.is.wire.WireFormat.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.is.wire.WireFormat;
  return proto.is.wire.WireFormat.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.is.wire.WireFormat} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.is.wire.WireFormat}
 */
proto.is.wire.WireFormat.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setRaw(value);
      break;
    case 2:
      var value = new google_protobuf_any_pb.Any;
      reader.readMessage(value,google_protobuf_any_pb.Any.deserializeBinaryFromReader);
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCreatedAt(value);
      break;
    case 4:
      var value = /** @type {!proto.is.wire.ContentType} */ (reader.readEnum());
      msg.setContentType(value);
      break;
    case 5:
      var value = new proto.is.wire.Status;
      reader.readMessage(value,proto.is.wire.Status.deserializeBinaryFromReader);
      msg.setStatus(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setCorrelationId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setReplyTo(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setExpiresIn(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.is.wire.WireFormat.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.is.wire.WireFormat.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.is.wire.WireFormat} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.is.wire.WireFormat.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_any_pb.Any.serializeBinaryToWriter
    );
  }
  f = message.getCreatedAt();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getContentType();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getStatus();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.is.wire.Status.serializeBinaryToWriter
    );
  }
  f = message.getCorrelationId();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getReplyTo();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getExpiresIn();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
};


/**
 * optional bytes raw = 1;
 * @return {!(string|Uint8Array)}
 */
proto.is.wire.WireFormat.prototype.getRaw = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes raw = 1;
 * This is a type-conversion wrapper around `getRaw()`
 * @return {string}
 */
proto.is.wire.WireFormat.prototype.getRaw_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getRaw()));
};


/**
 * optional bytes raw = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getRaw()`
 * @return {!Uint8Array}
 */
proto.is.wire.WireFormat.prototype.getRaw_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getRaw()));
};


/** @param {!(string|Uint8Array)} value */
proto.is.wire.WireFormat.prototype.setRaw = function(value) {
  jspb.Message.setOneofField(this, 1, proto.is.wire.WireFormat.oneofGroups_[0], value);
};


proto.is.wire.WireFormat.prototype.clearRaw = function() {
  jspb.Message.setOneofField(this, 1, proto.is.wire.WireFormat.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.is.wire.WireFormat.prototype.hasRaw = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.Any message = 2;
 * @return {?proto.google.protobuf.Any}
 */
proto.is.wire.WireFormat.prototype.getMessage = function() {
  return /** @type{?proto.google.protobuf.Any} */ (
    jspb.Message.getWrapperField(this, google_protobuf_any_pb.Any, 2));
};


/** @param {?proto.google.protobuf.Any|undefined} value */
proto.is.wire.WireFormat.prototype.setMessage = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.is.wire.WireFormat.oneofGroups_[0], value);
};


proto.is.wire.WireFormat.prototype.clearMessage = function() {
  this.setMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.is.wire.WireFormat.prototype.hasMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 created_at = 3;
 * @return {number}
 */
proto.is.wire.WireFormat.prototype.getCreatedAt = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.is.wire.WireFormat.prototype.setCreatedAt = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional ContentType content_type = 4;
 * @return {!proto.is.wire.ContentType}
 */
proto.is.wire.WireFormat.prototype.getContentType = function() {
  return /** @type {!proto.is.wire.ContentType} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {!proto.is.wire.ContentType} value */
proto.is.wire.WireFormat.prototype.setContentType = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional Status status = 5;
 * @return {?proto.is.wire.Status}
 */
proto.is.wire.WireFormat.prototype.getStatus = function() {
  return /** @type{?proto.is.wire.Status} */ (
    jspb.Message.getWrapperField(this, proto.is.wire.Status, 5));
};


/** @param {?proto.is.wire.Status|undefined} value */
proto.is.wire.WireFormat.prototype.setStatus = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.is.wire.WireFormat.prototype.clearStatus = function() {
  this.setStatus(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.is.wire.WireFormat.prototype.hasStatus = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional uint64 correlation_id = 6;
 * @return {number}
 */
proto.is.wire.WireFormat.prototype.getCorrelationId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {number} value */
proto.is.wire.WireFormat.prototype.setCorrelationId = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional string reply_to = 7;
 * @return {string}
 */
proto.is.wire.WireFormat.prototype.getReplyTo = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.is.wire.WireFormat.prototype.setReplyTo = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional uint32 expires_in = 8;
 * @return {number}
 */
proto.is.wire.WireFormat.prototype.getExpiresIn = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {number} value */
proto.is.wire.WireFormat.prototype.setExpiresIn = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * @enum {number}
 */
proto.is.wire.StatusCode = {
  UNKNOWN: 0,
  OK: 1,
  CANCELLED: 2,
  INVALID_ARGUMENT: 3,
  DEADLINE_EXCEEDED: 4,
  NOT_FOUND: 5,
  ALREADY_EXISTS: 6,
  PERMISSION_DENIED: 7,
  UNAUTHENTICATED: 8,
  FAILED_PRECONDITION: 9,
  OUT_OF_RANGE: 10,
  UNIMPLEMENTED: 11,
  INTERNAL_ERROR: 12
};

/**
 * @enum {number}
 */
proto.is.wire.ContentType = {
  NONE: 0,
  PROTOBUF: 1,
  JSON: 2,
  PROTOTEXT: 3
};

goog.object.extend(exports, proto.is.wire);
