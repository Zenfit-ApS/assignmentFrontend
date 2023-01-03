import update from 'react-addons-update';
import React, { PureComponent } from 'react';
import Loading from '../../Loading';
import { TextAlert } from '../../components/UI';
import { timeout } from '../../utils/helpers';
import * as api from '../../utils/api';

export default class PdfDownloader extends PureComponent {
  constructor(props) {
    super(props);

    this.source = undefined;
    this.state = {
      loading: true,
      reason: undefined,
      attempts: 0,
    };
  }

  componentDidMount() {
    this.dispatch();
  }

  componentWillUnmount() {
    if (this.source) {
      this.source.cancel('Operation canceled by the user.');
    }
  }

  render() {
    const { loading, reason } = this.state;

    return (
      <div>
        {loading && (
          <>
            <Loading/>
            <h5>Generating PDF for selected Meal Plan...</h5>
          </>
        )}
        {(reason && !loading) && (
          <TextAlert type="danger">Download failed... connection was lost.</TextAlert>
        )}
      </div>
    )
  }

  dispatch = async () => {
    const { plan } = this.props;

    this.loading = true;
    this.source = api.CancelToken.source();

    await timeout(1000);

    try {
      const response = await api.fetchPdf(plan, {
        cancelToken: this.source.token,
      });
      
      window.location.href = response.data.url;
    } catch (thrown) {
      if (!api.isCancel(thrown)) {
        this.setState(
          update(this.state, {
            reason: {
              $set: thrown.message,
            },
          })
        );
      }
    }

    this.loading = false;
    this.source = undefined;
  };

  retry = () => {
    this.setState(
      update(this.state, {
        attempts: {
          $set: this.state.attempts + 1,
        },
      })
    );
  };
  set loading(isLoading) {
    this.setState(
      update(this.state, {
        loading: {
          $set: isLoading,
        },
      })
    );
  }
}
