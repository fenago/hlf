'use strict';
/**
 * Write your transction processor functions here
 */
var NS = 'org.gryphon.casestudy.university';

/**
 * create a new certificate entry
 * @param {org.gryphon.casestudy.university.issueCertificate} args - student details
 * @transaction
 */
function issueCertificate(args) {
    var certificateId = 'CertificateID-' + Date.now().toString();
    var certificate;
    var _assetRegistry;
    return getAssetRegistry(NS + '.Certificate')
        .then(function (assetRegistry) {
            var factory = getFactory();

            certificate = factory.newResource(NS, 'Certificate', certificateId);
            certificate.issuedTo = args.studentName;
            certificate.programName = args.programName;
            certificate.issuedDate = new Date();
            certificate.certificateId = certificateId;
            return assetRegistry.add(certificate)
                .then(function (_res) {
                    return (_res);
                }).catch(
                    function (error) {
                        return (error);
                    });
        });
}
