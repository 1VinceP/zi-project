import React, { Component } from 'react';

class Canvas extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            canvasSize: {}, // Size of the canvas
            hexSize: 20, // Size of each hexagon
            hexOrigin: { x: 400, y: 300 } // Starting point of the (0, 0) hex
        }

        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    componentWillMount() {
        let hexParams = this.getHexParams()
        this.setState({
            // Sets size of the canvas to state
            canvasSize: { width: 800, height: 600 },
            hexParams: hexParams
        })
    };

    
    componentDidMount() {
        const { width, height } = this.state.canvasSize

        // Gets canvas dimensions from state
        this.canvasHex.width = width
        this.canvasHex.height = height
        this.canvasCoordinates.width = width
        this.canvasCoordinates.height = height
        this.getCanvasPosition( this.canvasCoordinates )
        this.drawHexes();
    };

    shouldComponentUpdate( nextProps, nextState ) {
        if( nextState.currentHex !== this.state.currentHex ) {
            const { q, r, s, x, y } = nextState.currentHex
            const { width, height } = this.state.canvasSize
            const ctx = this.canvasCoordinates.getContext('2d')

            ctx.clearRect( 0, 0, width, height )
            this.drawHex( this.canvasCoordinates, this.Point( x, y ), 'lime', 2 )

            return true
        }
        else
            return false
    }

    drawHexes() {
        const { width, height } = this.state.canvasSize
        const { hexWidth, hexHeight, vertDist, horizDist } = this.state.hexParams
        const hexOrigin = this.state.hexOrigin

        let qLeftSide = Math.round( hexOrigin.x / horizDist )
        let qRightSide = Math.round( ( width - hexOrigin.x ) / horizDist )
        let rTopSide = Math.round( hexOrigin.y / ( vertDist ) )
        let rBottomSide = Math.round( ( height - hexOrigin.y ) / vertDist )

        // This is the bottom half
        var p = 0
        for( let r = 0; r <= rBottomSide; r++ ) {
            if( r % 2 === 0 && r !== 0 )
                p++
            for( let q = -qLeftSide; q <= qRightSide; q++ ) {
                const { x, y } = this.hexToPixel( this.Hex( q - p, r ) )

                if( ( x > hexWidth / 2 && x < width - hexWidth / 2) && ( y > hexHeight / 2 && y < height - hexHeight / 2 ) ) {
                    this.drawHex( this.canvasHex, this.Point( x, y ) )
                    this.drawHexCoordinates( this.canvasHex, this.Point( x, y ), this.Hex( q - p, r, -q -r ) )
                }
            }
        }

        // This is the top half
        var n = 0
        for( let r = -1; r >= -rTopSide; r-- ) {
            if( r % 2 !== 0 )
                n++
            for( let q = -qLeftSide; q <= qRightSide; q++ ) {
                const { x, y } = this.hexToPixel( this.Hex( q + n, r ) )

                if( ( x > hexWidth / 2 && x < width - hexWidth / 2) && ( y > hexHeight / 2 && y < height - hexHeight / 2 ) ) {
                    this.drawHex( this.canvasHex, this.Point( x, y ) )
                    this.drawHexCoordinates( this.canvasHex, this.Point( x, y ), this.Hex( q + n, r, -q -r ) )
                }
            }
        }
    };

    // This finds corner a and corner b, then draws a line between them
    // Repeats 6 times, once for each side of the hex
    drawHex( canvasID, center, color, width ) {
        for( var i = 0; i <= 5; i++ ) {
            let start = this.getHexCornerCoord( center, i )
            let end = this.getHexCornerCoord( center, i + 1 )

            this.drawLine( canvasID, { x: start.x, y: start.y }, { x: end.x, y: end.y }, color, width )
        }
    };

    // This draws a line between each corner of the hex
    drawLine( canvasID, start, end, color, width ) {
        const ctx = canvasID.getContext('2d')

        ctx.beginPath()
        ctx.moveTo( start.x, start.y )
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.lineTo( end.x, end.y )
        ctx.stroke()
        ctx.closePath()
    };

    drawHexCoordinates( canvasID, center, h ) {
        const ctx = canvasID.getContext('2d')

        ctx.fillText( h.q, center.x+6, center.y )
        ctx.fillText( h.r, center.x-3, center.y+15 )
        ctx.fillText( h.s, center.x-12, center.y )
    }

    // This finds the corner of each hex
    getHexCornerCoord( center, i ) {
        // KEY pointy or flat

        // flat
        // let angleDeg = 60 * i

        // pointy
        let angleDeg = 60 * i + 30

        let angleRad = Math.PI / 180 * angleDeg
        let x = center.x + this.state.hexSize * Math.cos( angleRad )
        let y = center.y + this.state.hexSize * Math.sin( angleRad )

        return this.Point( x, y )
    };

    getHexParams() {
        // KEY pointy or flat

        // flat
        // let hexWidth = this.state.hexSize * 2
        // let hexHeight = Math.sqrt(3)/2 * hexWidth
        // let vertDist = hexHeight
        // let horizDist = hexWidth * 3/4

        // pointy
        let hexHeight = this.state.hexSize * 2
        let hexWidth = Math.sqrt(3)/2 * hexHeight
        let vertDist = hexHeight * 3/4
        let horizDist = hexWidth

        return { hexWidth, hexHeight, vertDist, horizDist }
    };

    getCanvasPosition( canvasID ) {
        let rect = canvasID.getBoundingClientRect()
        this.setState({
            canvasPosition: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom }
        })
    }

    // This gets the center of each hex
    hexToPixel( h ) {
        // KEY pointy or flat

        let hexOrigin = this.state.hexOrigin

        // flat
        // let y = this.state.hexSize * Math.sqrt(3) * ( h.q + h.r / 2 ) + hexOrigin.y
        // let x = this.state.hexSize * 3/2 * h.r + hexOrigin.x
        
        // pointy
        let x = this.state.hexSize * Math.sqrt(3) * ( h.q + h.r / 2 ) + hexOrigin.x
        let y = this.state.hexSize * 3/2 * h.r + hexOrigin.y

        return this.Point( x, y )
    };

    // Finds a hexagon based on cursor position
    pixelToHex( p ) {
        // KEY
        let size = this.state.hexSize
        let origin = this.state.hexOrigin

        // flat
        // let q = ( p.x - origin.x ) * 2/3 / size
        // let r = ( -( p.x - origin.x ) / 3 + Math.sqrt(3)/3 * ( p.y - origin.y ) ) / size
        // return Hex( q, r )

        // pointy
        let q = ( ( p.x - origin.x ) * Math.sqrt(3)/3 - ( p.y - origin.y ) / 3 ) / size
        let r = ( p.y - origin.y ) * 2/3 / size
        return this.Hex( q, r, -q -r )
    };

    cubeRound( cube ) {
        let rx = Math.round( cube.q )
        let ry = Math.round( cube.r )
        let rz = Math.round( cube.s )

        let x_diff = Math.abs( rx - cube.q )
        let y_diff = Math.abs( ry - cube.r )
        let z_diff = Math.abs( rz - cube.s )

        if( x_diff > y_diff && x_diff > z_diff )
            rx = -ry-rz
        else if( y_diff > z_diff )
            ry = -rx-rz
        else
            rz = -rx-ry

        return this.Hex( rx, ry, rz )
    }

    // 'Point' and 'Hex' assign their parameters to objects
    Point( x, y ) {
        return { x, y }
    };

    Hex( q, r, s ) {
        return { q, r, s }
    };

    handleMouseMove( e ) {
        const { left, right, top, bottom } = this.state.canvasPosition
        let offsetX = e.pageX - left
        let offsetY = e.pageY - top
        const { q, r, s } = this.cubeRound( this.pixelToHex( this.Point( offsetX, offsetY ) ) )
        const { x, y } = this.hexToPixel( this.Hex( q, r, s ) )

        this.setState({
            currentHex: { q, r, s, x, y }
        })

    };

    render() {
        return(
            <div>
                <canvas ref={ canvasHex => this.canvasHex = canvasHex } ></canvas>
                <canvas ref={ canvasCoordinates => this.canvasCoordinates = canvasCoordinates } onMouseMove={ this.handleMouseMove } ></canvas>
            </div>
        )
    }
}

export default Canvas;