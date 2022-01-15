import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from '@material-ui/core/Link';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GetAppIcon from '@material-ui/icons/GetApp';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Badge from '@material-ui/core/Badge';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
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

    <Link href="/dailycustomer">
      <ListItem button>
        <ListItemIcon>
          <GetAppIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Download Reports" />
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


    <Link href="/customerDocs">
      <ListItem button>
        <ListItemIcon>
          <CloudUploadIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Image & Docs  Management" />
      </ListItem>
    </Link>


    <Link href="/olddatamanagement">
      <ListItem button>
        <ListItemIcon>
          <FolderSpecialIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Find Consumer Before 2021" />
      </ListItem>
    </Link>


    <Link href="/connection">
      <ListItem button>
        <ListItemIcon>
          <TrendingUpIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Sales & Connection" />
      </ListItem>
    </Link>
    <Link href="/delivery">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="NC Delivery Dashboard" />
      </ListItem>
    </Link>
    <Link href="/refilsale">
      <ListItem button>
        <ListItemIcon>
          <MonetizationOnIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Refil Sale" />
        {/* <Badge className="animate__animated animate__flash animate__infinite animate__infinite 	infinite animate__slower	" badgeContent={"New"} color="secondary">
        </Badge> */}
      </ListItem>
    </Link>
    <Link href="/reports">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Connection Dashboard" />

      </ListItem>
    </Link>
    <Link href="/dash">
      <ListItem button>
        <ListItemIcon>
          <AccessibilityNewIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="User Activity" />

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
