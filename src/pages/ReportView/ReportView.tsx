import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { RouterGlobalProps } from '../../models/router';
import { Report } from '../../models';
import ReportViewPage from '../../PresentationalComponents/ReportViewPage';
import asyncComponent from '../../Utilities/asyncComponent';
import { ReportViewPaths } from './ReportViewConstants';
import { FetchStatus } from '../../models/state';
import { AxiosError } from 'axios';

interface StateToProps {
    report: Report | null,
    reportFetchStatus: FetchStatus | null,
    reportFetchError: AxiosError | null
}

interface DispatchToProps {
    fetchReport: (reportId: number) => void;
}

interface Props extends StateToProps, DispatchToProps, RouterGlobalProps {
};

interface State {
    reportId: number;
};

const WorkloadMigrationSummary = asyncComponent(() =>
    import(/* webpackChunkName: "WorkloadMigrationSummary" */ './WorkloadMigrationSummary'));
const InitialSavingsEstimation = asyncComponent(() =>
    import(/* webpackChunkName: "InitialSavingsEstimation" */ './InitialSavingsEstimation'));
const WorkloadInventory = asyncComponent(() =>
    import(/* webpackChunkName: "WorkloadInventory" */ './WorkloadInventory'));

class ReportView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            reportId: props.match.params.reportId
        };
    }

    componentDidMount() {
        const { reportId } = this.state;
        this.props.fetchReport(reportId);
    }

    render() {
        const { report, reportFetchStatus, reportFetchError } = this.props;

        return (
            <ReportViewPage
                report={ report }
                reportFetchStatus={ reportFetchStatus }
                reportFetchError={ reportFetchError }
            >
                <Switch>
                    <Route
                        path={ `${this.props.match.url}/${ReportViewPaths.workloadMigrationSummary}` }
                        component={ WorkloadMigrationSummary }
                    />
                    <Route
                        path={ `${this.props.match.url}/${ReportViewPaths.initialSavingsEstimation}` }
                        render={ (props: any) => <InitialSavingsEstimation { ...props } report={ report } /> }
                    />
                    <Route
                        path={ `${this.props.match.url}/${ReportViewPaths.workloadInventory}` }
                        component={ WorkloadInventory }
                    />

                    <Redirect
                        from={ `${this.props.match.url}` }
                        to={ `${this.props.match.url}/${ReportViewPaths.initialSavingsEstimation}` }
                    />
                </Switch>
            </ReportViewPage>
        );
    }
}

export default ReportView;
