import * as React from "react";
import {Label} from "office-ui-fabric-react/lib/Label";
import {Icon} from 'office-ui-fabric-react/lib/Icon';
import {IStyleSet} from 'office-ui-fabric-react/lib/Styling';
import {
    Pivot,
    PivotItem,
    PivotLinkSize,
    PivotLinkFormat,
    IPivotItemProps
} from "office-ui-fabric-react/lib/Pivot";
import "./tabManager.css";
import {FontSizes} from "@uifabric/fluent-theme";

const TabManagerComponent: React.FC = () => {
    return (
        <div className="tabManagerWrapper">
            <div className="tabManager">
                <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.normal}>
                    <PivotItem className="pivot-content"
                               onRenderItemLink={() => _appsDrawersRender()}>
                        <iframe src="/login" id="myIframe" frameBorder="0" scrolling="no"></iframe>
                    </PivotItem>
                    <PivotItem headerText="Recent">
                        <Label>Pivot #2</Label>
                    </PivotItem>
                    <PivotItem headerText="Shared with me">
                        <Label>Pivot #3</Label>
                    </PivotItem>
                </Pivot>
            </div>
        </div>
    );
};

function _appsDrawersRender() {
    return <Icon iconName="ViewAll" style={{fontSize: FontSizes.size24}}/>

}

function _customRenderer(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element): JSX.Element {
    return (
        <span>
      {defaultRenderer(link)}
            <Icon iconName="Airplane" style={{color: 'red'}}/>
    </span>
    );
}

export default TabManagerComponent;
