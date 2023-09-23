import React, {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState
} from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSearchParams } from "react-router-dom";

const Tabs = ({
  children,
  tabKey = "tab",
  defaultTab = "",
  onBeforeChange,
  onAfterChange,
  handleTabChange,
  tabsPane = [],
  responsive = {
    xs: {
      items: 1,
      breakpoint: { min: 0, max: Infinity }
    }
  }
}) => {
  const [mounted, setMounted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = (searchParams.get("tab") || defaultTab).toLowerCase();

  const carouselRef = useRef();

  const stateRef = useRef({
    tabChanged: false,
    tabIndexMap: {},
    tabValueMap: {},
    defaultTab,
    tab
  });

  useEffect(() => {
    const stateCtx = stateRef.current;

    if (carouselRef.current) {
      stateCtx.tab = tab;
      setMounted(true);
      carouselRef.current.goToSlide(stateCtx.tabIndexMap[tab]);
      console.log("tab change....", stateCtx);
    }
    return () => {
      stateCtx.withEvent = false;
    };
  }, [tab]);

  const _handleTabChange = useCallback(
    (e, value) => {
      setMounted(false);
      handleTabChange(value, e);
    },
    [handleTabChange]
  );

  const props = useMemo(
    () => ({
      tab,
      tabChanged: tab !== stateRef.current.tab
    }),
    [tab]
  );

  return (
    <Box
      sx={{
        ".react-multi-carousel-list": {
          mt: 1
        }
      }}
    >
      <MuiTabs
        value={tab}
        onChange={_handleTabChange}
        variant="scrollable"
        sx={{
          mb: 1,
          "& .MuiTab-root": {
            flex: 1
          },
          borderBottomColor: "divider"
        }}
      >
        {tabsPane.map((tab, i) => {
          stateRef.current.tabIndexMap[tab.value] = i;
          stateRef.current.tabValueMap[i] = tab.value;

          return <Tab key={i} value={tab.value} label={tab.label} wrapped />;
        })}
      </MuiTabs>
   
      <Carousel arrows={false} responsive={responsive} ref={carouselRef}>
        {children(props)}
      </Carousel>
    </Box>
  );
};

Tabs.propTypes = {};

export default Tabs;
