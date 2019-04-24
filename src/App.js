import React, {Component} from 'react';
import Navigation from "./components/navigation/Navigation";
import Head from "./components/head/Head";
import About from "./components/sections/about/About";
import Experience from "./components/sections/experience/Experience";

class App extends Component {
    render() {
        return (
            <>
                <Head description={"CV page using React"}/>
                <Navigation/>
                <div className="container-fluid p-0">
                    <About description="Programmer, student, interested in data science"/>
                    <Experience/>
                </div>
            </>
        );
    }
}

export default App;
