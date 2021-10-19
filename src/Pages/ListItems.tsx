import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from '@material-ui/core/Link';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GetAppIcon from '@material-ui/icons/GetApp';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
export const mainListItems = (
  <div>
        <Link href="/customer">
    <ListItem button>
      <ListItemIcon>
        <PersonAddIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Consumer Registration" />
    </ListItem>
    </Link>
    <Link href="/home">
    <ListItem button>
      <ListItemIcon>
        <SearchIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Find Consumer" />
    </ListItem>
    </Link>

    <Link href="/cst">
    <ListItem button>
      <ListItemIcon>
        <GetAppIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Download Reports" />
    </ListItem>
    </Link>


    <Link href="/reports">
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon  color="secondary"/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    </Link>


    <Link href="/trashUsers">
      <ListItem button>
        <ListItemIcon>
          <RestoreFromTrashIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Trash Consumers" />
      </ListItem>
    </Link>


    <Link href="/changepassword">
      <ListItem button>
        <ListItemIcon>
          <HistoryIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItem>
    </Link>


    <Link href="/customerDocs">
              <ListItem button>
                <ListItemIcon>
                  <CloudUploadIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Image & Docs  Management" />
              </ListItem>
            </Link>






  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
