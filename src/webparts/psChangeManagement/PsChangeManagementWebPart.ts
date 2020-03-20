import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PsChangeManagementWebPartStrings';
import PsChangeManagement from './components/PsChangeManagement';
import { IPsChangeManagementProps } from './components/IPsChangeManagementProps';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface IPsChangeManagementWebPartProps {
  description: string;
}

export default class PsChangeManagementWebPart extends BaseClientSideWebPart<IPsChangeManagementWebPartProps> {
  public httpClient: AadHttpClient;
  esdData: any;

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.aadHttpClientFactory
        .getClient('c250fba3-5005-4c79-a734-60b1ce4afdfb')
        .then((client: AadHttpClient): void => {
          this.httpClient = client;
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    const element: React.ReactElement<IPsChangeManagementProps > = React.createElement(
      PsChangeManagement,
      {
        context: this.context,
        client: this.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
