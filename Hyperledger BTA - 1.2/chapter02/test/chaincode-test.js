'use strict';
/**
 * Write the unit tests for your transction processor functions here
 */

const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

require('chai').should();

const _timeout = 90000;
const NS = 'org.gryphon.casestudy.university';

describe('Connect Network', function () {

    this.timeout(_timeout);
    let businessNetworkConnection;
    before(function () {
        businessNetworkConnection = new BusinessNetworkConnection();
        return businessNetworkConnection.connect('admin@university_example');
    });

    describe('#issueCertificate', () => {

        const PROGRAM_NAME = 'MBA';
        const STUDENT_NAME = 'John';
            
        it('should be able to issue Certificate', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the stepUp transaction
            const issueCertificate = factory.newTransaction(NS, 'issueCertificate');
            issueCertificate.studentName = STUDENT_NAME;
            issueCertificate.programName = PROGRAM_NAME;
            return businessNetworkConnection.submitTransaction(issueCertificate)
                .then((_res) => {
                    return businessNetworkConnection.getAssetRegistry(NS + '.Certificate');
                })
                .then((assetRegistry) => {
                    // re-get the asset registry
                    return assetRegistry.getAll();
                })
                .then((allCertificates) => {
                    // the owner of the commodity should not be simon
                    let index = allCertificates.length - 1;
                    console.log('Number of Certificates: ' + allCertificates.length);
                    console.log('Certifcate ID: ' + allCertificates[index].certificateId);
                    allCertificates[index].issuedTo.should.equal(STUDENT_NAME);
                    allCertificates[index].programName.should.equal(PROGRAM_NAME);
                });
        });
    });
});
