
const targetType = {
    0: 'Unknown',
    1: 'Domain',
    2: 'IpAddress'
};

const scanType = {
    0: 'PortScan',
    1: 'WebScan',
};

const WebSiteStatus = {
    0: 'Initial',
    2: 'Active',
    4: 'IpAddress',
    8: 'ContentChanged',
};

const SslCertificateStatus = {
    0: 'Valid',
    2: 'NotAvailable',
    4: 'NameMismatch',
    8: 'ChainErrors',
    16: 'Expired',
    32: 'NotValid'
};



const scanState = {
    0: 'Stopped',
    1: 'Queued',
    2: 'Error',
    3: 'Running',
    4: 'Completed'
};

const httpStatus = {
    Unknown : '0',
    Continue : '100',
    SwitchingProtocols : '101',
    OK : '200',
    Created : '201',
    Accepted : '202',
    NonAuthoritativeInformation : '203',
    NoContent : '204',
    ResetContent : '205',
    PartialContent : '206',
    Ambiguous : '300',
    MultipleChoices : '300',
    Moved : '301',
    MovedPermanently : '301',
    Found : '302',
    Redirect : '302',
    RedirectMethod : '303',
    SeeOther : '303',
    NotModified : '304',
    UseProxy : '305',
    Unused : '306',
    RedirectKeepVerb : '307',
    TemporaryRedirect : '307',
    BadRequest : '400',
    Unauthorized : '401',
    PaymentRequired : '402',
    Forbidden : '403',
    NotFound : '404',
    MethodNotAllowed : '405',
    NotAcceptable : '406',
    ProxyAuthenticationRequired : '407',
    RequestTimeout : '408',
    Conflict : '409',
    Gone : '410',
    LengthRequired : '411',
    PreconditionFailed : '412',
    RequestEntityTooLarge : '413',
    RequestUriTooLong : '414',
    UnsupportedMediaType : '415',
    RequestedRangeNotSatisfiable : '416',
    ExpectationFailed : '417',
    UpgradeRequired : '426',
    InternalServerError : '500',
    NotImplemented : '501',
    BadGateway : '502',
    ServiceUnavailable : '503',
    GatewayTimeout : '504',
    HttpVersionNotSupported : '505',
    HostNotFound : '1000',
    ConnectionRefused : '1001',
    TimedOut : '1002',
    NoData : '1003',
    HostUnreachable : '1004',
    NetworkUnreachable : '1005',
};




export  function getTargetType(type) {
    for (let targetTypeKey in targetType) {
        if (targetTypeKey===type.toString()){
            return targetType[type]
        }
    }
    return ""
}

export  function getScanType(type) {
    for (let targetTypeKey in scanType) {
        if (targetTypeKey===type.toString()){
            return scanType[type]
        }
    }
    return ""
}

export  function getScanState(type) {
    for (let targetTypeKey in scanState) {
        if (targetTypeKey===type.toString()){
            return scanState[type]
        }
    }
    return ""
}

export  function getHttpStatus(type) {
    for (let targetTypeKey in httpStatus) {
        if (httpStatus[targetTypeKey]===type.toString()){
            return targetTypeKey
        }
    }
    return ""
}