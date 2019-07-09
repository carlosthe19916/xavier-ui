import React from 'react';
import Dropzone from 'react-dropzone';
import {
    Button,
    Bullseye,
    EmptyStateBody,
    EmptyStateVariant,
    EmptyState,
    Title
} from '@patternfly/react-core';
import { RouterGlobalProps } from '../../models/router';
import ProcessImprovementSvg from '../../PresentationalComponents/Icons/process-improvement.svg';
import './Reports.scss';

interface StateToProps {
    file: File | null
}

interface DispatchToProps {
    selectUploadFile: (file: File) => any;
}

interface Props extends StateToProps, DispatchToProps, RouterGlobalProps {
};

interface State {
};

class NoReports extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    onDrop = (files: File[]) => {
        this.props.selectUploadFile(files[0]);
        this.props.history.push('/reports/upload');
    };

    render() {
        return (
            <Bullseye>
                <EmptyState variant={ EmptyStateVariant.full }>
                    <div className="pf-c-empty-state__icon" style={ { opacity: 0.6 } }>
                        <ProcessImprovementSvg height="80px" />
                    </div>
                    <Title size="lg">Let Red Hat Migration Analytics suggest ways to optimize your environment</Title>
                    <EmptyStateBody>
                                See how you can optimize your virtual environment by
                                uploading a Red Hat CloudForms generated inventory file
                                and then letting Red Hat Migration Analytics create
                                reports showing how you can save money and optimize
                                workloads - whether by migrating virtual machines or
                                migrating application to RHEL.
                    </EmptyStateBody>
                    <Dropzone
                        onDrop={ this.onDrop }
                        noClick noKeyboard
                        multiple={ false }
                        accept={ [ 'application/zip', 'application/json' ] }
                    >
                        { ({ getRootProps, getInputProps, open }) => {
                            return (
                                <div { ...getRootProps({ className: 'dropzone' }) }>
                                    <input { ...getInputProps() } />
                                    <Button
                                        type="button"
                                        variant="primary"
                                        onClick={ open }>
                                        Get Started
                                    </Button>
                                </div>
                            );
                        } }
                    </Dropzone>
                </EmptyState>
            </Bullseye>
        );
    }
}

export default NoReports;
