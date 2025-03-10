import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "../../state/api";
import Header from "../../components/Header";
import { geoData } from "../../state/geoData";
import { ResponsiveChoropleth } from "@nivo/geo";

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subTitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75dvh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
          data={data}
          value="value"
          colors="nivo"
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left:0 }}
          domain={[0, 60]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={130}
          projectionTranslation={[0.45, 0.6]}
          projectionRotation={[0, 0, 0]}
          projectionType="mercator"
          enableGraticule={false}
          graticuleLineWidth={0.5}
          graticuleLineColor="#ffffff"
          isInteractive={true}
          borderWidth={1.3}
          borderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 25,
              translateY: -125,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: theme.palette.mode ==="dark" ? theme.palette.secondary[200]: "#000000",
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
