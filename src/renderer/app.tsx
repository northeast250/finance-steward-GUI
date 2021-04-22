import React from "react";
import { Component } from "react";
import { setLibrary } from "./redux/lib/actions";
import { AppState } from "./redux/store";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Skeleton } from "@material-ui/lab";
import { Button, Card, CardContent, Grid, TextField } from "@material-ui/core";
import { CompImgWithOcr } from "./components/ocr/CompImgWithOcr";
import { CompShowOcrItems } from "./components/ocr/CompShowOcrItems";
import { IMG_WIDTH, SHOW_OCR_ITEMS } from "./config";
import { ipcRenderer } from "electron";
import { Msg, SIGNAL } from "../general/communications";
import { FrontImg } from "./redux/lib/reducer";

interface AppProps {
  visible: FrontImg[];
  setLibrary: any;
}

class App extends Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      inited: false,
      filter: "",
    };
  }
  async componentDidMount() {
    const libString: string = await ipcRenderer.invoke(SIGNAL.INIT_LIB);
    this.setState({ inited: true });
    this.props.setLibrary(JSON.parse(libString));
    console.log("inited ");
  }

  render() {
    const { visible, setLibrary } = this.props;
    const { inited } = this.state;
    return (
      // body定义了8px的margin，所以这里width最好用100%，但height可以用100vh
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <h1>Library</h1>

        <div id={"content"} style={{ width: "100%", height: "100%" }}>
          {inited ? (
            visible.map((img) => (
              <Card key={img.path} variant={"outlined"}>
                <CardContent>
                  <Grid container spacing={0} justify={"flex-start"}>
                    <Grid item xs sm={6} md={4} lg={3}>
                      <CompImgWithOcr img={img} />
                    </Grid>

                    {SHOW_OCR_ITEMS && (
                      <Grid item xs sm={6} md={4} lg={3}>
                        <CompShowOcrItems img={img} />
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            ))
          ) : (
            <div
              id={"content-skeleton"}
              style={{ width: "100%", height: "100%" }}
            >
              {[0, 1, 2].map((item) => (
                <Card key={item} variant={"outlined"}>
                  <CardContent>
                    <Grid container spacing={0} justify={"flex-start"}>
                      <Grid item xs sm={6} md={4} lg={3}>
                        <Skeleton
                          animation={"wave"}
                          height={400}
                          width={IMG_WIDTH}
                          variant={"rect"}
                        />
                      </Grid>

                      {SHOW_OCR_ITEMS && (
                        <Grid item xs sm={6} md={4} lg={3}>
                          <Skeleton
                            animation={"wave"}
                            height={400}
                            width={IMG_WIDTH}
                            variant={"rect"}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div
          id={"filter"}
          style={{
            position: "fixed",
            right: 0,
            bottom: 0,
            padding: 10,
            width: "100%",
            background: "white",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <TextField
            label={"write filter function: doc => boolean"}
            multiline
            rows={1}
            rowsMax={3}
            style={{ minWidth: 300, marginRight: 10 }}
            onBlur={(e) => this.setState({ filter: e.target.value })}
          />

          <Button
            variant={"outlined"}
            color={"secondary"}
            onClick={() => {
              this.setState({ inited: false });
              ipcRenderer
                .invoke(SIGNAL.FILTER_LIB, this.state.filter)
                .then((e: Msg) => {
                  this.setState({ inited: true });
                  if (e.message) {
                    alert(e.message);
                  } else {
                    setLibrary(JSON.parse(e.data));
                  }
                });
            }}
          >
            Filter
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = (state: AppState) => ({
  visible: state.lib.visible,
});

const mapDispatch = (dispatch: ThunkDispatch<AppState, null, any>) => ({
  setLibrary: (s: FrontImg[]) => dispatch(setLibrary(s)),
});

export default connect(mapState, mapDispatch)(App);
