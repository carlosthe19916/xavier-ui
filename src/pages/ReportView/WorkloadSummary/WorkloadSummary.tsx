import React from 'react';
import {
    Skeleton,
    SkeletonTable
} from '@redhat-cloud-services/frontend-components';
import { ObjectFetchStatus } from '../../../models/state';
import { ReportWorkloadSummary } from '../../../models';
import {
    Bullseye,
    EmptyState,
    EmptyStateIcon,
    EmptyStateVariant,
    Title,
    EmptyStateBody,
    Button,
    TitleLevel,
    Stack,
    StackItem
} from '@patternfly/react-core';
import { ErrorCircleOIcon } from '@patternfly/react-icons';
import ReportCard from '../../../PresentationalComponents/ReportCard';
import SummaryTable from '../../../PresentationalComponents/Reports/SummaryTable';
import FancyChartDonut from '../../../PresentationalComponents/FancyChartDonut';
import { FancyChartDonutData } from '../../../PresentationalComponents/FancyChartDonut/FancyChartDonut';
import { formatPercentage, formatNumber } from '../../../Utilities/formatValue';
import ScansRunTable from '../../../PresentationalComponents/Reports/ScansRunTable';
import WorkloadsDetectedTable from '../../../SmartComponents/Reports/WorkloadsDetectedTable';
import FlagsTable from '../../../SmartComponents/Reports/FlagsTable';

interface StateToProps {
    reportWorkloadSummary: ReportWorkloadSummary;
    reportWorkloadSummaryFetchStatus: ObjectFetchStatus;
}

interface DispatchToProps {
    fetchReportWorkloadSummary: (reportId: number) => any;
}

interface Props extends StateToProps, DispatchToProps {
    reportId: number;
};

interface State {
};

const sumReducer = (a: number, b: number) => a + b;

class WorkloadMigrationSummary extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        this.refreshData();
    }

    public refreshData = () => {
        const { reportId, fetchReportWorkloadSummary } = this.props;
        fetchReportWorkloadSummary(reportId);
    };

    public renderSummary = () => {
        const { reportWorkloadSummary } = this.props;

        return (
            <ReportCard title="Summary">
                <SummaryTable
                    summary={ reportWorkloadSummary.summary }
                />
            </ReportCard>
        );
    };

    public renderMigrationComplexity = () => {
        const { reportWorkloadSummary } = this.props;
        const complexity = reportWorkloadSummary.complexity;

        //
        const pieValues = [
            complexity.easy,
            complexity.medium,
            complexity.difficult,
            complexity.unknown
        ];

        const total = pieValues.reduce(sumReducer, 0);
        const percentages = pieValues.map((val: number) => val / total);

        const chartProps = {
            title: formatPercentage(1, 0),
            subTitle: 'total',
            height: 300,
            width: 300
        };
        const chartLegendProps = {
            height: 300,
            width: 210,
            responsive: false,
            y: 60
        };

        const chartData: FancyChartDonutData[] = [
            { label: 'Easy', value: percentages[0], data: pieValues[0] },
            { label: 'Medium', value: percentages[1], data: pieValues[1] },
            { label: 'Difficult', value: percentages[2], data: pieValues[2] },
            { label: 'Unknow', value: percentages[3], data: pieValues[3] }
        ];

        const tickFormat = (label: string, value: number, data: any) => `${label}: ${formatPercentage(value, 2)} - VMs: ${formatNumber(data, 0)}`;
        return (
            <ReportCard
                title='Migration complexity'
            >
                <FancyChartDonut
                    data={ chartData }
                    chartProps={ chartProps }
                    chartLegendProps={ chartLegendProps }
                    tickFormat={ tickFormat }
                />
            </ReportCard>
        );
    };

    public renderTargetRecommendation = () => {
        const { reportWorkloadSummary } = this.props;
        const targetsRecommendation = reportWorkloadSummary.targetsRecommendation;

        const pieValues = [
            targetsRecommendation.rhv,
            targetsRecommendation.osp,
            targetsRecommendation.rhel
        ];
        const total = pieValues.reduce(sumReducer, 0);
        const percentages = pieValues.map((val: number) => val / total);
        
        return (
            <ReportCard
                title='Target recommendation'
                skipBullseye={ true }
            >
                <div className="pf-l-grid pf-m-all-6-col-on-md pf-m-all-4-col-on-lg pf-m-gutter">
                    <div>
                        <h2 className="pf-c-title pf-m-4xl">
                            { formatPercentage(percentages[0], 0) } RHV
                        </h2>
                        <h3 className="pf-c-title pf-m-1xl">
                            Workloads suitable for Red Hat Virtualization
                        </h3>
                    </div>
                    <div>
                        <h2 className="pf-c-title pf-m-4xl">
                            { formatPercentage(percentages[1], 0) } OSP
                        </h2>
                        <h3 className="pf-c-title pf-m-1xl">
                            Workloads could be running on Red Hat OpenStack Platform
                        </h3>
                    </div>
                    <div>
                        <h2 className="pf-c-title pf-m-4xl">
                            { formatPercentage(percentages[2], 0) } RHEL
                        </h2>
                        <h3 className="pf-c-title pf-m-1xl">
                            Workloads running, or possible to migrate to Red Hat Enterprise Linux
                        </h3>
                    </div>
                </div>
            </ReportCard>
        );
    };

    public renderWorkloadsDetectedTable = () => {
        const { reportId } = this.props;
        
        return (
            <ReportCard
                title='Workloads detected'
                skipBullseye={ true }
            >
                <WorkloadsDetectedTable reportId={ reportId }/>
            </ReportCard>
        );
    };

    public renderWorkloadsDetected = () => {
        const { reportWorkloadSummary } = this.props;
        const complexity = reportWorkloadSummary.complexity;

        //
        const pieValues = [
            complexity.easy,
            complexity.medium,
            complexity.difficult,
            complexity.unknown
        ];

        const total = pieValues.reduce(sumReducer, 0);
        const percentages = pieValues.map((val: number) => val / total);

        const chartProps = {
            title: formatPercentage(1, 0),
            subTitle: 'Total',
            height: 300,
            width: 300
        };
        const chartLegendProps = {
            height: 300,
            width: 210,
            responsive: false,
            y: 60
        };

        const chartData: FancyChartDonutData[] = [
            { label: 'RHEL', value: percentages[0] },
            { label: 'SLES', value: percentages[1] },
            { label: 'Windows', value: percentages[2] },
            { label: 'OEL', value: percentages[3] }
        ];

        const tickFormat = (label: string, value: number) => `${label}: ${formatPercentage(value, 2)}`;
        return (
            <ReportCard
                title='Workloads detected (OS Types)'
            >
                <FancyChartDonut
                    data={ chartData }
                    chartProps={ chartProps }
                    chartLegendProps={ chartLegendProps }
                    tickFormat={ tickFormat }
                />
            </ReportCard>
        );
    };

    public renderFlagsTable = () => {
        const { reportId } = this.props;
        
        return (
            <ReportCard
                title='Flags (Considerations to be migrated)'
                skipBullseye={ true }
            >
                <FlagsTable reportId={ reportId }/>
            </ReportCard>
        );
    };

    public renderScansRun = () => {
        const { reportWorkloadSummary } = this.props;

        return (
            <ReportCard title="Scans run">
                <ScansRunTable
                    scanRuns={ reportWorkloadSummary.scanRuns }
                />
            </ReportCard>
        );
    };

    public renderReports = () => {
        return (
            <React.Fragment>
                <Stack gutter='md'>
                    <StackItem isFilled={ false }>
                        { this.renderSummary() }
                    </StackItem>
                    <StackItem isFilled={ false }>
                        { this.renderMigrationComplexity() }
                    </StackItem>
                    <StackItem isFilled={ false }>
                        { this.renderTargetRecommendation() }
                    </StackItem>
                    <StackItem isFilled={ false }>
                        { this.renderWorkloadsDetectedTable() }
                    </StackItem>
                    <StackItem isFilled={ false }>
                        { this.renderWorkloadsDetected() }
                    </StackItem>
                    <StackItem isFilled={ false }>
                        { this.renderFlagsTable() }
                    </StackItem>
                    <StackItem isFilled={ false }>
                        { this.renderScansRun() }
                    </StackItem>
                </Stack>
            </React.Fragment>
        );
    };

    public renderReportSkeleton = () => {
        return (
            <React.Fragment>
                <Stack gutter='md'>
                    <StackItem isFilled={ false }>
                        <ReportCard
                            title={ <Skeleton size="sm" /> }
                            skipBullseye={ true }
                        >
                            <Stack gutter="md">
                                <StackItem isFilled={ false }>
                                    <Skeleton size="sm" /><br />
                                    <Skeleton size="sm" style={ { height: '60px' } } /><br />
                                    <Skeleton size="sm" />
                                </StackItem>
                                <StackItem isFilled={ false } className="stack-item-border">
                                    <Skeleton size="lg"/>
                                </StackItem>
                            </Stack>
                        </ReportCard>
                    </StackItem>
                    <StackItem isFilled={ false }>
                        <ReportCard
                            title={ <Skeleton size="sm" /> }
                        >
                            <Skeleton size="sm" style={ { height: '300px' } }/>
                        </ReportCard>
                    </StackItem>
                    <StackItem isFilled={ false }>
                        <ReportCard
                            title={ <Skeleton size="sm" /> }
                        >
                            <SkeletonTable colSize={ 3 } rowSize={ 3 }/>
                        </ReportCard>
                    </StackItem>
                    <StackItem isFilled={ false }>
                        <ReportCard
                            title={ <Skeleton size="sm" /> }
                        >
                            <SkeletonTable colSize={ 2 } rowSize={ 2 }/>
                        </ReportCard>
                    </StackItem>
                </Stack>
            </React.Fragment>
        );
    };

    public renderFetchError = () => {
        return (
            <Bullseye>
                <EmptyState variant={ EmptyStateVariant.large }>
                    <EmptyStateIcon icon={ ErrorCircleOIcon } />
                    <Title headingLevel={ TitleLevel.h5 } size="lg">
                        Error
                    </Title>
                    <EmptyStateBody>
                        Something unexpected happend, please try again!
                    </EmptyStateBody>
                    <Button variant="primary" onClick={ this.refreshData }>Retry</Button>
                </EmptyState>
            </Bullseye>
        );
    };
    
    public render() {
        const { reportWorkloadSummary, reportWorkloadSummaryFetchStatus } = this.props;

        const isFetchComplete: boolean = reportWorkloadSummaryFetchStatus.status === 'complete';

        if (reportWorkloadSummaryFetchStatus.error || (isFetchComplete && !reportWorkloadSummary)) {
            return this.renderFetchError();
        }

        return (
            <React.Fragment>
                { isFetchComplete ? this.renderReports() : this.renderReportSkeleton() }
            </React.Fragment>
        );
    }
}

export default WorkloadMigrationSummary;
