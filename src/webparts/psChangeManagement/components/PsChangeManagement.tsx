import * as React from 'react';
import styles from './PsChangeManagement.module.scss';
import { IPsChangeManagementProps } from './IPsChangeManagementProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import CalendarComponent from './CalendarComponent';

const PsChangeManagement =(props)=> {
    return (
       <div className={styles.psChangeManagement}>
       <CalendarComponent props={props}/>
     </div>
    );
 
}
export default PsChangeManagement;