import React from 'react';
import { shallow } from 'enzyme';
import { OSInformation } from './OSInformation';
import { ReportWorkloadSummary } from 'src/models';

const BasicReportWorkloadSummary: ReportWorkloadSummary = {
    complexityModel: {
        easy: 1,
        hard: 2,
        medium: 3,
        unknown: 4,
        unsupported: 5
    },
    recommendedTargetsIMSModel: {
        ocp: 10,
        osp: 20,
        rhel: 30,
        rhv: 40,
        total: 100
    },
    scanRunModels: [],
    summaryModels: [],
    workloadsDetectedOSTypeModels: [],
    javaRuntimes: [],
    applicationPlatforms: [],
    osInformation: []
};

describe('JavaRuntimesCard', () => {
    it('expect to render', () => {
        const reportWorkloadSummary: ReportWorkloadSummary = {
            ...BasicReportWorkloadSummary,
            javaRuntimes: [
                {
                    vendor: 'VendorA',
                    version: '8',
                    total: 10,
                    priority: null
                },
                {
                    vendor: 'VendorB',
                    version: '11',
                    total: 20,
                    priority: 100
                },
                {
                    vendor: 'VendorB',
                    version: '8',
                    total: 15,
                    priority: 200
                }
            ]
        };

        const wrapper = shallow(<OSInformation reportWorkloadSummary={reportWorkloadSummary} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('expect to render empty card when undefined reportWorkloadSummary', () => {
        const wrapper = shallow(<OSInformation reportWorkloadSummary={null} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('expect to render empty card when no java runtimes', () => {
        const reportWorkloadSummary: ReportWorkloadSummary = {
            ...BasicReportWorkloadSummary,
            javaRuntimes: []
        };

        const wrapper = shallow(<OSInformation reportWorkloadSummary={reportWorkloadSummary} />);
        expect(wrapper).toMatchSnapshot();
    });
});
