/*eslint-disable*/
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import image from "assets/img/rhconnection/carrousel/entrev-vid-call.jpeg";
import errorPageStyle from "assets/jss/material-kit-pro-react/pages/errorPageStyles.js";
import React from "react";
//import HeaderLinks from "../../components/Header/HeaderLinks";
import Footer from "../../components/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
// core components
import Header from "../../components/Header";



const useStyles = makeStyles(errorPageStyle);

export default function ErrorPage({ ...rest }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>

      <Header
			  links={<ArrowBack className={classes.icon} />}
        brand="Clique aqui para retornar à pagina principal"
        absolute
        color="transparent"
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        {/* <div className={classes.container}> */}
        <div className={classes.contentCenter}>
          <GridContainer>
            <GridItem md={12}>
              <h1 className={classes.title}>404</h1>
              <h2 className={classes.subTitle}>Página não encontrada:(</h2>
              <h4 className={classes.description}>
                Opa! Algo deu errado, favor retornar para a página anterior.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
        {/* </div> */}
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://optimistic-wiles-b537d8.netlify.app/"
                    target="_blank"
                    className={classes.block}
                  >
                    Connectionrh
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://optimistic-wiles-b537d8.netlify.app/"
                target="_blank"
              >
                Rembrantech
              </a>
            </div>
          </div>
        }
      />
    </div>
  );
}
