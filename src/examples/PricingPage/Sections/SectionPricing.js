import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "pages/Login/node_modules/components/Grid/GridContainer.js.js";
import GridItem from "pages/Login/node_modules/components/Grid/GridItem.js.js";
import NavPills from "components/NavPills/NavPills.js";
import Card from "pages/Login/node_modules/components/Card/Card.js.js";
import CardBody from "pages/Login/node_modules/components/Card/CardBody.js.js";
import Button from "pages/Login/node_modules/components/CustomButtons/Button.js.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import pricingStyle from "assets/jss/material-kit-pro-react/pages/pricingSections/pricingStyle.js";

const useStyles = makeStyles(pricingStyle);

export default function SectionPricing() {
  const classes = useStyles();
  return (
    <div className={classes.pricingSection}>
      <GridContainer>
        <GridItem
          md={6}
          sm={6}
          className={classNames(
            classes.mrAuto,
            classes.mlAuto,
            classes.textCenter
          )}
        >
          <NavPills
            alignCenter
            color="rose"
            tabs={[
              {
                tabButton: "monthly",
              },
              {
                tabButton: "yearly",
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={4} sm={4}>
          <Card plain pricing>
            <CardBody pricing>
              <h6
                className={classNames(classes.cardCategory, classes.textInfo)}
              >
                Free
              </h6>
              <h1 className={classes.cardTitle}>
                <small>$</small>0 <small>/mo</small>
              </h1>
              <ul>
                <li>
                  <b>1</b> Project
                </li>
                <li>
                  <b>5</b> Team Members
                </li>
                <li>
                  <b>55</b> Personal Contacts
                </li>
                <li>
                  <b>5.000</b> Messages
                </li>
              </ul>
              <Button href="#pablo" color="rose" round>
                Get started
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={4} sm={4}>
          <Card raised pricing color="rose">
            <CardBody pricing>
              <h6 className={classes.cardCategory}>Premium</h6>
              <h1 className={classes.cardTitleWhite}>
                <small>$</small>89 <small>/mo</small>
              </h1>
              <ul>
                <li>
                  <b>500</b> Project
                </li>
                <li>
                  <b>50</b> Team Members
                </li>
                <li>
                  <b>125</b> Personal Contacts
                </li>
                <li>
                  <b>15.000</b> Messages
                </li>
              </ul>
              <Button href="#pablo" color="white" round>
                Get started
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md={4} sm={4}>
          <Card plain pricing>
            <CardBody pricing>
              <h6
                className={classNames(classes.cardCategory, classes.textInfo)}
              >
                Platinum
              </h6>
              <h1 className={classes.cardTitle}>
                <small>$</small>199 <small>/mo</small>
              </h1>
              <ul>
                <li>
                  <b>1000</b> Project
                </li>
                <li>
                  <b>100</b> Team Members
                </li>
                <li>
                  <b>550</b> Personal Contacts
                </li>
                <li>
                  <b>50.000</b> Messages
                </li>
              </ul>
              <Button href="#pablo" color="rose" round>
                Get started
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
