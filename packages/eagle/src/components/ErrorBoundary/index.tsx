import { parrotI18n } from "@cloudtower/parrot";
import React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

class ErrorBoundary extends React.Component<
  WithTranslation,
  { error: unknown }
> {
  constructor(props: WithTranslation) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div title={String(this.state.error)}>
          {this.props.t("components.unknow_error")}
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation(parrotI18n)(ErrorBoundary);
