import React, { useReducer, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import clsx from "clsx";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { drawerStyles } from "../Styles/drawer";
import logo from "../assets/images/logo-white.svg";
import Hidden from "@material-ui/core/Hidden";
import FolderIcon from "@material-ui/icons/Folder";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(drawerStyles);

const DELETE = "delete";
const ADD = "add";

const ItemTypes = {
  FOLDER: "folder",
  LINKS: "links",
};

const generateLinks = (routes, handleLinkClick, path = "") => {
  const { name, children } = routes;
  if (name === "Bookmarks" || name === "Root") {
    const dataTobeSent = children.map((el) => {
      return generateLinks(el, handleLinkClick, `${path}/${el.name}`);
    });
    return dataTobeSent;
  } else {
    if (children.length > 0) {
      return (
        <CreateLinkWithCollapse
          data={children.map((el) => {
            return generateLinks(el, handleLinkClick, `${path}/${el.name}`);
          })}
          handleClick={handleLinkClick}
          parentElement={routes}
          key={routes.name}
          path={path}
        />
      );
    } else {
      return (
        <CreateLinksWithoutCollapse
          data={routes}
          handleClick={handleLinkClick}
          key={routes.name}
          path={path}
        />
      );
    }
  }
};

const SidebarLogo = () => {
  const classes = useStyles();

  return (
    <div className={classes.logo}>
      <a
        // href="https://www.creative-tim.com?ref=mdpr-sidebar"
        // target="_blank"
        className={classes.logoMini}
      >
        <img src={logo} alt="logo" className={classes.logoImage} />
      </a>
      <a
        // href="https://www.creative-tim.com?ref=mdpr-sidebar"
        // target="_blank"
        className={classes.logoNormal}
      >
        BookMarks
      </a>
    </div>
  );
};

const drawerReducer = (state, action) => {
  switch (action.type) {
    case "delete-folder": {
      const { path } = action;
      const pathArray = path.substr(1).split("/");

      // deeply nested obejcts are there needs to copy accordingly

      let foundObject = state;
      // console.log(foundObject);
      for (let i = 0; i < pathArray.length; i++) {
        if (i < pathArray.length - 1) {
          console.log(foundObject);
          foundObject = foundObject.children.find(
            (data) => data.name === pathArray[i]
          );
        }
      }

      foundObject.children = foundObject.children.filter(
        (data) => data.name !== pathArray[pathArray.length - 1]
      );
      return { ...state };
      // break;
    }
    case "add-folder": {
      const { path, name } = action;
      const pathArray = path.substr(1).split("/");
      // let currentState = state["Root"];
      // deeply nested obejcts are there needs to copy accordingly
      let foundObject = state;
      for (let i = 0; i < pathArray.length; i++) {
        foundObject = foundObject.children.find(
          (data) => data.name === pathArray[i]
        );
      }
      const newFolder = {
        name: name,
        type: "folder",
        links: [],
        children: [],
        metadata: [
          {
            ADD_DATE: `${new Date().getTime()}`,
            LAST_MODIFIED: `${new Date().getTime()}`,
          },
        ],
      };
      foundObject = foundObject || state;
      const foundArray = foundObject.children.filter(
        (data) => data.name === name
      );
      if (foundArray.length > 0) {
        throw new Error("Folder name already exists !!!");
      } else {
        foundObject.children = foundObject.children.map((data) => data);
        foundObject.children.push(newFolder);
      }
      return { ...state };
    }
    default:
      return state;
  }
};

const Sidebar = ({
  isOpen = false,
  routes = {},
  handleFolderClick,
  handleDrawerState,
  handleSmDrawerState,
  isSmOpen=false
}) => {
  const classes = useStyles();
  const [path, setPath] = useState("");
  const [routeData, dispatch] = useReducer(drawerReducer, routes);
  // console.log(routes);
  const ref = useRef(null);

  const handleClickOnFolder = (data) => {
    const { target, path } = data;
    console.log(data);
    setPath(path);
  };
  const handleIconClick = (type = "add") => {
    switch (type) {
      case DELETE: {
        if (path) {
          dispatch({
            type: "delete-folder",
            path: path,
          });
        } else {
          alert("Select Folder to delete");
        }
        break;
      }

      case ADD: {
        let name = prompt("Folder name");
        if (name) {
          dispatch({
            type: "add-folder",
            path: path,
            name: name,
          });
        }
        break;
      }
      default:
        break;
    }
  };
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.FOLDER, ItemTypes.LINKS],
    collect(monitor) {
      return {};
    },
    hover(item, monitor) {
      console.log(item.path);
      console.log("main item");
      // console.log(ref.current);
      // console.log(ref.current);
    },
  }));
  // drop(ref);
  return (
    <div>
      <Hidden smDown implementation="css">
        <Drawer
          variant="persistent"
          anchor="left"
          // className={classes.drawer}
          open={isOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          elevation={32}
          transitionDuration={225}
          
        >
          <SidebarLogo />
          <IconBar handleClick={handleIconClick} />
          <div className={classes.sidebarWrapper} ref={drop}>
            <List className={classes.list}>
              {generateLinks(routeData, handleClickOnFolder)}
            </List>
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          // variant="temporary"
          // BackdropProps={{ invisible: true }}
          // className={classes.drawer}
          // BackdropProps={{ invisible: true }}
          anchor="right"
          open={isSmOpen}
          onClose={handleSmDrawerState}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SidebarLogo />
          <IconBar handleClick={handleIconClick} />

          <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
                {generateLinks(routeData, handleClickOnFolder)}
            </List>
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
};

const CreateLinkWithCollapse = ({ data, handleClick, parentElement, path }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const handleListItemClick = () => {
    handleClick({ target: parentElement, path });
  };

  const handleExpansion = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    setOpen(!open);
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.FOLDER,
      item: () => {
        return { path };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [path, parentElement.name]
  );

  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.FOLDER, ItemTypes.LINKS],
    collect(monitor) {
      return {};
    },
    hover(item, monitor) {
      console.log(item.path);
      console.log(ref.current);
      if(item.path!== path && !open){
        setOpen(true);
      }
    },
  }));

  const classes = useStyles();
  drag(drop(ref));
  return (
    <React.Fragment key={parentElement.name}>
      <ListItem
        button
        onClick={handleListItemClick}
        className={isDragging ? classes.draggingList : classes.listItems}
        ref={ref}
      >
        <ExpandMore
          onClick={handleExpansion}
          className={clsx(classes.expansionIcon, {
            [classes.expansionIconNotExpanded]: !open,
            [classes.expnsionIconExpanded]: open,
          })}
        />
        <FolderIcon className={classes.folderIcon} />{" "}
        <ListItemText primary={parentElement.name}></ListItemText>
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List className={classes.list +" " + classes.childList}>{data}</List>
      </Collapse>
    </React.Fragment>
  );
};

const CreateLinksWithoutCollapse = ({ data, handleClick, path }) => {
  const handleListItemClick = () => {
    handleClick({ target: data, path });
  };
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FOLDER,
    item: () => {
      return { path };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.FOLDER, ItemTypes.LINKS],
    collect(monitor) {
      return {};
    },
    hover(item, monitor) {
      console.log(item.path);
      console.log(ref.current);
    },
  }));
  const classes = useStyles();
  drag(drop(ref));
  return (
    <ListItem
      button
      onClick={handleListItemClick}
      key={data.name}
      className={isDragging ? classes.draggingList : classes.listItems}
      ref={ref}
    >
      <FolderIcon className={classes.folderIcon} />
      <ListItemText primary={data.name} />
    </ListItem>
  );
};

const IconBar = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.iconBarWrapper}>
      <CreateNewFolderIcon
        className={classes.folderIcon}
        onClick={() => handleClick(ADD)}
      />
      <DeleteIcon
        className={classes.folderIcon}
        onClick={() => handleClick(DELETE)}
      />
    </div>
  );
};
// Sidebar.propTypes = {
//   isOpen: PropTypes.bool,
//   isMinified: PropTypes.bool,
//   routes: PropTypes.object,
// };

export default Sidebar;
