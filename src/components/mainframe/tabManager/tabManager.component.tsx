import * as React from "react";
import {useState} from "react";
import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {Pivot, PivotItem, PivotLinkFormat, PivotLinkSize} from "office-ui-fabric-react/lib/Pivot";
import {FontSizes} from "@uifabric/fluent-theme";
import {ContextSelectorContainer} from "../contextSelector/contextSelector.container";
import "./tabManager.css";


const TabManagerComponent: React.FC = (props) => {

    const [selectedKey, setSelectedKey] = useState("_apps");


    return (
        <div className="tabManagerWrapper">
            <div className="tabManager">
                <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.normal} selectedKey={selectedKey}
                       onLinkClick={(item: any) => {
                           setSelectedKey(item.props.itemKey);
                       }} headersOnly={true}>
                    <PivotItem itemKey="_apps" onRenderItemLink={() => _appsDrawersRender()}/>
                    <PivotItem headerText="Videografico" itemKey="_videografico"/>
                    <PivotItem headerText="Pruebas" itemKey="_pruebas"/>
                </Pivot>
                <div className="iframeContentWrapper">
                    {selectedKey === "_apps" && <ContextSelectorContainer {...props} />}
                    <iframe id="videografico_iframe" src={"/videographic?userToken="}
                            style={{display: selectedKey === "_videografico" ? "block" : "none"}}
                            className="iframeContent" frameBorder="0" scrolling="no"></iframe>
                </div>
            </div>
        </div>
    );
};

function _appsDrawersRender() {
    return <Icon iconName="ViewAll" style={{fontSize: FontSizes.size24}}/>

}

export default TabManagerComponent;
